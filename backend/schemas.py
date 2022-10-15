import uuid
from datetime import datetime

from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import constr
from pydantic import FilePath
from pydantic import UUID4


# region  -------USER-------

class Address(BaseModel):
    address: constr(max_length=50)
    city: constr(max_length=50)
    region: constr(max_length=50)
    postal_code: constr(max_length=10)
    country: constr(max_length=50)

class UserBaseSchema(BaseModel):
    username: constr(max_length=25)
    first_name: constr(max_length=25)
    last_name: constr(max_length=25)
    email: EmailStr
    photo: FilePath | None
    phone: constr(max_length=20) | None
    class Config:
        orm_mode = True


class CreateUserSchema(UserBaseSchema):
    password: constr(min_length=8, max_length=50)
    passwordConfirm: constr(min_length=8, max_length=50)
    is_admin: bool = False
    address_id: UUID4 | None


class LoginUserSchema(BaseModel):
    identifier: EmailStr | constr(max_length=25)
    password: constr(min_length=8, max_length=50)


class UserResponse(BaseModel):
    user: UserBaseSchema
    address: Address

# endregion
