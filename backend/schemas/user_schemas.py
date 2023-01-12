from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import FilePath
from pydantic import UUID4
from pydantic import constr
from pydantic import StrictBool
from .address_schemas import AddressResponse


class UserBase(BaseModel):
    username: constr(max_length=25)
    first_name: constr(max_length=25)
    last_name: constr(max_length=25)
    email: EmailStr
    photo: FilePath | None
    phone: constr(max_length=20) | None
    is_admin: StrictBool

    class Config:
        orm_mode = True

class UserBaseExtended(UserBase):
    id: UUID4
    class Config:
        orm_mode = True


class UserResponse(BaseModel):
    user: UserBaseExtended
    address: AddressResponse
    class Config:
        orm_mode = True


class UserInputPatch(BaseModel):
    first_name: constr(max_length=25) = None
    last_name: constr(max_length=25) = None
    email: EmailStr = None
    photo: FilePath = None
    phone: constr(max_length=20) = None
    password: constr(min_length=8, max_length=60) = None
    passwordConfirm: constr(min_length=8, max_length=60) = None

    class Config:
        orm_mode = True


class LoginInputPost(BaseModel):
    identifier: EmailStr | constr(max_length=25)
    password: constr(min_length=8, max_length=60)

class LoginResponse(BaseModel):
    status: str
    access_token: str

class RegisterUserInputPost(UserBase):

    password: constr(min_length=8, max_length=60)
    passwordConfirm: constr(min_length=8, max_length=60)

class RegisterUserInputPostExtended(RegisterUserInputPost):
    id: UUID4 | None
    address_id: UUID4 | None