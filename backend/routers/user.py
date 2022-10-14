from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from .. import models
from .. import oauth2
from .. import schemas
from ..database import get_db

router = APIRouter()


@router.get('/me', response_model=schemas.UserResponse)
def get_me(db: Session = Depends(get_db), user_id: str = Depends(oauth2.require_user)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user
