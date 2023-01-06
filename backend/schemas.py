from decimal import Decimal

from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import FilePath
from pydantic import UUID4
from pydantic import constr
from pydantic import StrictBool


# region  -------USER-------

class Address(BaseModel):
    address: constr(max_length=50)
    city: constr(max_length=50)
    region: constr(max_length=50)
    postal_code: constr(max_length=10)
    country: constr(max_length=50)

    class Config:
        orm_mode = True

class UserBaseSchema(BaseModel):
    username: constr(max_length=25)
    first_name: constr(max_length=25)
    last_name: constr(max_length=25)
    email: EmailStr
    photo: FilePath | None
    phone: constr(max_length=20) | None
    is_admin: StrictBool

    class Config:
        orm_mode = True


class CreateUserSchema(UserBaseSchema):
    password: constr(min_length=8, max_length=60)
    passwordConfirm: constr(min_length=8, max_length=60)

class CreateUserSchemaWithAddressId(CreateUserSchema):
    address_id: UUID4 | None

    class Config:
        orm_mode = True


class LoginUserSchema(BaseModel):
    identifier: EmailStr | constr(max_length=25)
    password: constr(min_length=8, max_length=60)


class UserResponse(BaseModel):
    user: UserBaseSchema
    address: Address
    class Config:
        orm_mode = True

class LoginUserResponse(BaseModel):
    status: str
    access_token: str


# endregion

# region  -------PRODUCT-------

class Product(BaseModel):
    id: UUID4
    sale_price: Decimal
    title: constr(max_length=150)
    description: str
    photo: FilePath | None
    stock: int
    discontinued: bool

    class Config:
        orm_mode = True


class ProductCategory(BaseModel):
    id: UUID4
    title: constr(max_length=150)
    description: str
    photo: FilePath | None


class ProductsResponse(BaseModel):
    products: list[Product]

    class Config:
        orm_mode = True


class ProductsCategories(BaseModel):
    categories: list[ProductCategory]

    class Config:
        orm_mode = True
# endregion
