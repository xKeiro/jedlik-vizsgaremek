from datetime import timedelta

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request
from fastapi import Response
from fastapi import status
from pydantic import EmailStr
from sqlalchemy import or_
from sqlalchemy.orm import Session

from backend import oauth2
from backend.oauth2 import AuthJWT
from .. import models
from .. import util
from ..config import settings
from ..database import get_db
from ..schemas import user_schemas
from ..util import error_response_message

router = APIRouter()
ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN


@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=user_schemas.UserResponse)
async def create_user(user: user_schemas.RegisterUserInputPost, db: Session = Depends(get_db)):
    user = user_schemas.RegisterUserInputPostExtended.parse_obj(user)
    user_exists = db.query(models.User) \
        .filter(models.User.email == EmailStr(user.email.lower()),
                models.User.username == user.username) \
        .first()
    if user_exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=error_response_message('Account already exist'))
    if user.password != user.passwordConfirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=error_response_message('Passwords do not match'))
    user.password = util.hash_password(user.password)
    user.email = EmailStr(user.email.lower())
    new_address = models.Address(**user.address.dict())
    db.add(new_address)
    db.commit()
    db.refresh(new_address)
    user.address_id = new_address.id
    del user.passwordConfirm
    del user.address
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    new_user.address = new_address
    return new_user


@router.post('/login', response_model=user_schemas.LoginResponse)
def login(payload: user_schemas.LoginInputPost, response: Response, db: Session = Depends(get_db),
          Authorize: AuthJWT = Depends()):
    user = db.query(models.User).filter(
        or_(models.User.email == EmailStr(payload.identifier.lower()),
            models.User.username == payload.identifier)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message('Incorrect Email or Password'))

    if not util.verify_password(payload.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message('Incorrect Email or Password'))

    access_token = Authorize.create_access_token(
        subject=str(user.id), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))

    refresh_token = Authorize.create_refresh_token(
        subject=str(user.id), expires_time=timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN))

    # Store refresh and access tokens in cookie
    response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('refresh_token', refresh_token,
                        REFRESH_TOKEN_EXPIRES_IN * 60, REFRESH_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')

    return {'status': 'success', 'access_token': access_token}


@router.get('/refresh')
def refresh_token(response: Response, request: Request, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    try:
        print(Authorize._refresh_cookie_key)
        Authorize.jwt_refresh_token_required()

        user_id = Authorize.get_jwt_subject()
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail=error_response_message('Could not refresh access token'))
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail=error_response_message('The user belonging to this token no logger exist'))
        access_token = Authorize.create_access_token(
            subject=str(user.id), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))
    except Exception as e:
        error = e.__class__.__name__
        if error == 'MissingTokenError':
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=error_response_message('Please provide refresh token'))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')
    return {'access_token': access_token}


@router.get('/logout', status_code=status.HTTP_200_OK)
def logout(response: Response, Authorize: AuthJWT = Depends(), user_id: str = Depends(oauth2.require_user)):
    Authorize.unset_jwt_cookies()
    response.set_cookie('logged_in', '', -1)

    return {'status': 'success'}
