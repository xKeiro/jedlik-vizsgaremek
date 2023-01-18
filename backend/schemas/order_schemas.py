from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import FilePath
from pydantic import UUID4
from pydantic import constr
from pydantic import StrictBool
from .user_schemas import UserResponse
from .product_order_schemas import ProductOrderResponse

class OrderResponse(BaseModel):
    id: UUID4
    user: UserResponse
    shipper: None
    ordered_products: list[ProductOrderResponse]
    vat: Decimal
    status: constr(max_length = 20)
    order_date: datetime

class OrdersResponse(BaseModel):
    orders: list[OrderResponse]
