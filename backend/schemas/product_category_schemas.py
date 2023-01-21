from pydantic import BaseModel
from pydantic import FilePath
from pydantic import UUID4
from pydantic import constr


class ProductCategoryInputPost(BaseModel):
    title: constr(max_length=150)
    description: str
    photo: FilePath | None


class ProductCategoryInputPatch(BaseModel):
    title: constr(max_length=150) = None
    description: str = None
    photo: FilePath = None


class ProductCategoryResponse(ProductCategoryInputPost):
    id: UUID4

    class Config:
        orm_mode = True


class ProductCategoriesResponse(BaseModel):
    categories: list[ProductCategoryResponse]

    class Config:
        orm_mode = True
