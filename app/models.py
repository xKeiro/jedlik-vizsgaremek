import uuid
from .database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean, text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Address(Base):
    __tablename__ = 'address'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    region = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)
    country = Column(String, nullable=False)

class User(Base):
    __tablename__ = 'user'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    name = Column(String,  nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    address_id = Column(UUID(as_uuid=True), ForeignKey('address.id', ondelete='CASCADE'), nullable=False)
    photo = Column(String, nullable=True)
    is_admin = Column(Boolean, server_default='False', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))
    address = relationship('Address')

class Supplier(Base):
    __tablename__='supplier'
    id =  id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    company_name = Column(String, nullable=False)
    contact_name = Column(String, nullable=True)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    address_id = Column(UUID(as_uuid=True), ForeignKey('address.id', ondelete='CASCADE'), nullable=False)
    address = relationship('Address')

class ProductCategory(Base):
    __tablename__='product_category'
    id =  id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
