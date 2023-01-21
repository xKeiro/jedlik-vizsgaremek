from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from .. import models
from ..database import get_db
from ..schemas import order_schemas

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
