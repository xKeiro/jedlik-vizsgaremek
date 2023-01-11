from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from pydantic import UUID4
from sqlalchemy.orm import Session

from .. import models
from .. import schemas
from ..database import get_db

router = APIRouter()

@router.get('/',  status_code=status.HTTP_201_CREATED,  response_model=schemas.ProductsCategories)
async def get_products_by_categories(db: Session = Depends(get_db)):
    product_categories = db.query(models.ProductCategory).order_by(models.ProductCategory.title).all()
    return {"categories": product_categories}

@router.post('/', response_model=schemas.ProductCategory)
async def get_products_by_categories(category: schemas.CreateProductCategory, db: Session = Depends(get_db)):
    new_category = models.ProductCategory(**category.dict())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

@router.get('/{category_id}', response_model=schemas.ProductsResponse)
async def get_products_by_category_id(category_id: UUID4, db: Session = Depends(get_db)):
    products = db.query(models.Product).filter(models.Product.category_id == category_id,
                                               models.Product.discontinued == False).order_by(models.Product.title).all()
    return {"products": products}
