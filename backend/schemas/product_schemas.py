from pydantic import BaseModel
from pydantic import FilePath
from pydantic import UUID4
from pydantic import constr
from pydantic import condecimal


class ProductInputPost(BaseModel):
    category_id: UUID4
    base_price: condecimal(decimal_places=2, max_digits=12)
    title: constr(max_length=150)
    description: str
    photo: FilePath | None
    stock: int
    discount: condecimal(decimal_places=2, max_digits=2)
    discontinued: bool
    featured: bool

    class Config:
        orm_mode = True


class ProductInputPatch(BaseModel):
    category_id: UUID4 = None
    base_price: condecimal(decimal_places=2, max_digits=12) = None
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
