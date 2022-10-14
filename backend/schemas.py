import uuid
from datetime import datetime

from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import constr


class UserBaseSchema(BaseModel):
    name: str
    email: EmailStr
    photo: str | None
    phone: str | None
    address: str
    city: str
    region: str
    postal_code: str
    country: str

    class Config:
        orm_mode = True


class CreateUserSchema(UserBaseSchema):
    password: constr(min_length=8)
    passwordConfirm: str
    is_admin: bool = False


class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=8)


class UserResponse(UserBaseSchema):
    id: uuid.UUID
    created_at: datetime
