from pydantic import BaseModel
from pydantic import UUID4
from pydantic import condecimal

from .product_schemas import ProductResponse


class ProductOrderResponse(BaseModel):
    id: UUID4
    product: ProductResponse
    base_price: condecimal(decimal_places=2, max_digits=12)
    quantity: int
    discount: condecimal(decimal_places=2, max_digits=2)

    class Config:
        orm_mode = True

class ProductOrderInputPost(BaseModel):
    product_id: UUID4
    quantity: int
