from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from pydantic import UUID4
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from .. import models
from .. import oauth2
from ..database import get_db
from ..schemas import user_schemas
from ..util import error_response_message

router = APIRouter()


@router.get('/me', response_model=user_schemas.UserResponse)
def get_me(db: Session = Depends(get_db), user_id: str = Depends(oauth2.require_user)):
    return db \
        .query(models.User) \
        .filter(models.User.id == user_id) \
        .options(joinedload(models.User.address)) \
        .first()


@router.get('/{user_id}', response_model=user_schemas.UserResponse)
async def get_products_by_category_id(user_id: UUID4, db: Session = Depends(get_db)):
    user = db \
        .query(models.User) \
        .filter(models.User.id == user_id) \
        .options(joinedload(models.User.address)) \
        .first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message("The user does not exists!"))
    return user


@router.patch('/{user_id}', response_model=user_schemas.UserResponse)
async def get_products_by_category_id(user_id: UUID4, user: user_schemas.UserInputPatch, db: Session = Depends(get_db)):
    user_query = db.query(models.User).filter(models.User.id == user_id)
    if not user_query.first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message("The user does not exists!"))
    if user:
        if user.address and user.address.dict(exclude_unset=True):
            address_query = db.query(models.Address).filter(models.User.id == user_id)
            address_id = address_query.first().id
            address_query = db.query(models.Address).filter(models.Address.id == address_id)
            address = user.address
            address_query.update(address.dict(exclude_unset=True))
        del user.address
        if user.dict(exclude_unset=True):
            user_query.update(user.dict(exclude_unset=True))
    db.commit()
    updated_user = user_query \
        .options(joinedload(models.User.address)) \
        .first()
    return updated_user
