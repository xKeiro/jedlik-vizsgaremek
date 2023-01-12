from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import status
from fastapi import Depends
from pydantic import UUID4
from sqlalchemy.orm import Session

from .. import models
from ..schemas import product_schemas
from ..database import get_db
from ..util import error_response_message

router = APIRouter()


@router.get('/', response_model=product_schemas.ProductsResponse)
async def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).filter(models.Product.discontinued == False).all()
    return {"products": products}

@router.post('/', response_model=product_schemas.ProductResponse)
async def post_products(product: product_schemas.ProductInputPost, db: Session = Depends(get_db)):
    category_exists = db.query(models.ProductCategory)\
        .filter(models.ProductCategory.id == product.category_id)\
        .first()
    if not category_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message('Incorrect Category Id!'))
    new_product = models.Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.get('/featured', response_model=product_schemas.ProductsResponse)
async def get_featured_products(db: Session = Depends(get_db)):
    products = db.query(models.Product)\
        .filter(models.Product.discontinued == False)\
        .filter(models.Product.featured == True)\
        .all()
    return {"products": products}

@router.get('/all', response_model=product_schemas.ProductsResponse)
async def get_all_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    return {"products": products}


@router.get('/{product_id}', response_model=product_schemas.ProductResponse)
async def get_product_by_product_id(product_id: UUID4, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    return product
