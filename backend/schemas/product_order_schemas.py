from decimal import Decimal
from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import FilePath
from pydantic import UUID4
from pydantic import constr
from pydantic import StrictBool
from .product_schemas import ProductResponse


class ProductOrderResponse(BaseModel):
    id: UUID4
    product: ProductResponse
    unit_price: Decimal
    quantity: int
    discount: Decimal