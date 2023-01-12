from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session
from pydantic import UUID4

from .. import models
from .. import oauth2
from ..schemas import user_schemas
from ..schemas import address_schemas
from ..database import get_db
from ..util import error_response_message

router = APIRouter()


@router.get('/me', response_model=user_schemas.UserResponse)
def get_me(db: Session = Depends(get_db), user_id: str = Depends(oauth2.require_user)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    address = db.query(models.Address).filter(models.User.id == user_id).first()
    return { "user": user, "address": address.__dict__ }

@router.get('/{user_id}', response_model=user_schemas.UserResponse)
async def get_products_by_category_id(user_id: UUID4, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message("The user does not exists!"))
    address = db.query(models.Address).filter(models.User.id == user_id).first()
    return {"user": user, "address": address.__dict__}

@router.patch('/{user_id}', response_model=user_schemas.UserResponse)
async def get_products_by_category_id(user_id: UUID4, user: user_schemas.UserInputPatch | None, address: address_schemas.RegisterAddressInputPost | None, db: Session = Depends(get_db)):
    user_query = db.query(models.User).filter(models.User.id == user_id)
    if not user_query.first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message("The user does not exists!"))
    # update_user = user_.dict(exclude_unset=True)
    # updated_user = user.copy(update=update_user)
    # user = updated_user
    address_query = db.query(models.Address).filter(models.User.id == user_id)
    if not address_query.first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message("The user does not have an address!"))
    address_id = address_query.first().id
    address_query = db.query(models.Address).filter(models.Address.id == address_id)
    # update_address = address_.dict(exclude_unset=True)
    user_query.update(user.dict(exclude_unset=True))
    address_query.update(address.dict(exclude_unset=True))
    # db.commit()
    updated_user = user_query.first()
    updated_address = address_query.first()
    db.commit()
    db.refresh(updated_user)
    db.refresh(address_query)

    return {"user": updated_user.__dict__, "address": updated_address.__dict__}
