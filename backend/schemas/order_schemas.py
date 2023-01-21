from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel
from pydantic import UUID4
from pydantic import constr

from .product_order_schemas import ProductOrderResponse
from .user_schemas import UserResponse
from .shipper_schemas import ShipperResponse


class OrderResponse(BaseModel):
    id: UUID4
    user: UserResponse
    shipper: ShipperResponse
    ordered_products: list[ProductOrderResponse]
    vat: Decimal
    status: constr(max_length=20)
    order_date: datetime

    class Config:
        orm_mode = True


class OrdersResponse(BaseModel):
    orders: list[OrderResponse]

    class Config:
        orm_mode = True
