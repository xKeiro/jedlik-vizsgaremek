from pydantic import BaseModel
from pydantic import UUID4
from pydantic import constr


class RegisterAddressInputPost(BaseModel):
    address: constr(max_length=50)
    city: constr(max_length=50)
    region: constr(max_length=50)
    postal_code: constr(max_length=10)
    country: constr(max_length=50)


class AddressResponse(RegisterAddressInputPost):
    id: UUID4

    class Config:
        orm_mode = True


class AddressInputPatch(BaseModel):
    address: constr(max_length=50) = None
    city: constr(max_length=50) = None
    region: constr(max_length=50) = None
    postal_code: constr(max_length=10) = None
    country: constr(max_length=4) = None
