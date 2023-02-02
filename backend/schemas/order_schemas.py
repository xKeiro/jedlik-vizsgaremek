from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel
from pydantic import UUID4
from pydantic import constr
from pydantic import condecimal

from .product_order_schemas import ProductOrderResponse
from .shipper_schemas import ShipperResponse
from .user_schemas import UserResponse
from .product_order_schemas import ProductOrderInputPost
from enum import Enum

class OrderStatus(str, Enum):
    IN_PROGRESS = "in progress"
    UNDER_PROCUREMENT = "under procurement"
    FULFILLED = "fulfilled"
    DELETED = "deleted"

class OrderBaseModel(BaseModel):
    id: UUID4 = None
    user_id: UUID4
    shipper_id: UUID4
    vat: condecimal(decimal_places=2, max_digits=2) = None
    status: OrderStatus = None
    order_date: datetime = None




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
class OrderInputPost(BaseModel):
    shipper_id: UUID4
    ordered_products: list[ProductOrderInputPost]
