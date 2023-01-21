from decimal import Decimal
from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import FilePath
from pydantic import UUID4
from pydantic import constr
from pydantic import StrictBool

class ShipperResponse(BaseModel):
    id: UUID4
    company_name: constr(max_length = 75)
    contact_first_name: constr(max_length = 25)
    contact_last_name: constr(max_length = 25)
    phone: constr(max_length = 20)
    email: EmailStr
    price: Decimal

    class Config:
        orm_mode = True