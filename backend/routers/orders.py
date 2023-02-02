from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from .. import models
from ..database import get_db
from ..schemas import order_schemas
from backend.oauth2 import require_user
from ..schemas.order_schemas import OrderInputPost
from ..util import error_response_message

router = APIRouter()


@router.get('/', response_model=order_schemas.OrdersResponse)
async def get_products(db: Session = Depends(get_db)):
    orders = db.query(models.Order) \
        .options(joinedload(models.Order.user)
                 .options(joinedload(models.User.address)),
                 joinedload(models.Order.shipper)
                 ).all()
    for order in orders:
        ordered_products = db \
            .query(models.ProductOrder) \
            .filter(models.ProductOrder.order_id == order.id) \
            .options(joinedload(models.ProductOrder.product)) \
            .all()
        order.ordered_products = ordered_products
    return {"orders": orders}

@router.post('/', response_model=order_schemas.OrderResponse)
async def post_product(order: OrderInputPost, user_id: str = Depends(require_user), db: Session = Depends(get_db)):
    shipper_exists = db.query(models.Shipper)\
        .filter(models.Shipper.id == order.shipper_id)\
        .first()
    if not shipper_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message("The category doesn't exists!"))
    for ordered_product in order.ordered_products:
        product_exists = db.query(models.Product)\
            .filter(models.Product.id == ordered_product.product_id)\
            .first()
        if not product_exists:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=error_response_message("At least one of the products doesn't exists!"))
    country = db.query(models.User)\
        .filter(models.User.id == user_id)\
        .options(joinedload(models.User.address))\
        .first()\
        .address\
        .country
    vat = 0.27 if country.upper() == "HU" else 0.00
    new_order = models.Order(
        user_id=user_id,
        shipper_id=order.shipper_id,
        vat=vat)
    db.add(new_order)
    db.commit()
    new_ordered_products = list()
    db.refresh(new_order)
    for ordered_product in order.ordered_products:
        product = db\
            .query(models.Product)\
            .filter(models.Product.id == ordered_product.product_id)\
            .first()
        new_product_order = models.ProductOrder(
            order_id=new_order.id,
            product_id=ordered_product.product_id,
            base_price=product.base_price,
            quantity=ordered_product.quantity,
            discount=product.discount
        )
        new_ordered_products.append(new_product_order)
    db.add_all(new_ordered_products)
    db.commit()
    db.refresh(new_order)
    setattr(new_order, "ordered_products", new_ordered_products)
    return new_order


