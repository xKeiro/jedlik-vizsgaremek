from decimal import Decimal
from pydantic import BaseModel
from pydantic import FilePath
from pydantic import UUID4
from pydantic import constr

class ProductInputPost(BaseModel):
    category_id: UUID4
    sale_price: Decimal
    title: constr(max_length=150)
    description: str
    photo: FilePath | None
    stock: int
    discontinued: bool
    featured: bool

    class Config:
        orm_mode = True


class ProductInputPatch(BaseModel):
    category_id: UUID4 = None
    sale_price: Decimal = None
    title: constr(max_length=150) = None
    description: str = None
    photo: FilePath = None
    stock: int = None
    discontinued: bool = None
    featured: bool = None

    class Config:
        orm_mode = True

class ProductResponse(ProductInputPost):
    id: UUID4

    class Config:
        orm_mode = True

class ProductsResponse(BaseModel):
    products: list[ProductResponse]

    class Config:
        orm_mode = True