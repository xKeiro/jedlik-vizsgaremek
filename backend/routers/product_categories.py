from datetime import timedelta

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request
from fastapi import Response
from fastapi import status
from pydantic import EmailStr
from pydantic import UUID4
from sqlalchemy.orm import Session
from sqlalchemy import or_

from backend import oauth2
from backend.oauth2 import AuthJWT
from .. import models
from .. import schemas
from .. import util
from ..config import settings
from ..database import get_db

router = APIRouter()
ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN

@router.get('/', response_model=schemas.ProductsCategories)
async def get_products_by_categories(db: Session = Depends(get_db)):
    product_categories = db.query(models.ProductCategory).all()
    return {"categories": [category.__dict__ for category in product_categories]}


@router.get('/{category_id}', response_model=schemas.ProductsResponse)
async def get_products_by_category_id(category_id: UUID4, db: Session = Depends(get_db)):
    products = db.query(models.Product).filter(models.Product.category_id == category_id, models.Product.discontinued == False).all()
    return {"products": [product.__dict__ for product in products]}
