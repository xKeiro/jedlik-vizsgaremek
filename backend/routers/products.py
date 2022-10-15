from fastapi import APIRouter
from fastapi import Depends
from pydantic import UUID4
from sqlalchemy.orm import Session

from .. import models
from .. import schemas
from ..database import get_db

router = APIRouter()


@router.get('/', response_model=schemas.ProductsResponse)
async def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).filter(models.Product.discontinued == False).all()
    return {"products": products}


@router.get('/{product_id}', response_model=schemas.Product)
async def get_product_by_product_id(product_id: UUID4, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    return product
