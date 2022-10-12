import uuid
from .database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean, text
from sqlalchemy.dialects.postgresql import UUID



class User(Base):
    __tablename__ = 'user'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    name = Column(String,  nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    region = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)
    country = Column(String, nullable=False)
    photo = Column(String, nullable=True)
    is_admin = Column(Boolean, server_default='False', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))
