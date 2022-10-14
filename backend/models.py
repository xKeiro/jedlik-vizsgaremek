import uuid

from sqlalchemy import Boolean
from sqlalchemy import CheckConstraint
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import String
from sqlalchemy import TIMESTAMP
from sqlalchemy import UniqueConstraint
from sqlalchemy import text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from .database import Base


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
    username = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
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
    __tablename__ = 'supplier'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    company_name = Column(String, nullable=False)
    contact_name = Column(String, nullable=True)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    address_id = Column(UUID(as_uuid=True), ForeignKey('address.id', ondelete='CASCADE'), nullable=False)
    address = relationship('Address')


class ProductCategory(Base):
    __tablename__ = 'product_category'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    photo = Column(String, nullable=True)


class Product(Base):
    __tablename__ = 'product'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    category_id = Column(UUID(as_uuid=True), ForeignKey('product_category.id'), nullable=False)
    sale_price = Column(Numeric(12, 2), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    photo = Column(String, nullable=True)
    stock = Column(Integer, nullable=False, server_default="0")
    discontinued = Column(Boolean, server_default="False")
    product_category = relationship('ProductCategory')


class ProductSupplier(Base):
    __tablename__ = 'product_supplier'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey('product.id'), nullable=False)
    supplier_id = Column(UUID(as_uuid=True), ForeignKey('supplier.id'), nullable=False)
    purchase_price = Column(Numeric(12, 2), nullable=False)
    product = relationship('Product', foreign_keys=[product_id])
    supplier = relationship('Supplier', foreign_keys=[supplier_id])
    __table_args__ = (
        UniqueConstraint(product_id, supplier_id, name='unique_product_supplier'),
    )


class Shipper(Base):
    __tablename__ = 'shipper'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    price = Column(String, nullable=False)


class Order(Base):
    __tablename__ = 'order'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)
    shipper_id = Column(UUID(as_uuid=True), ForeignKey('shipper.id'), nullable=False)
    vat = Column(Numeric(2, 2), nullable=False, server_default="0")
    status = Column(String, nullable=False)
    order_date = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))
    user = relationship('User', foreign_keys=[user_id])
    shipper = relationship('Shipper', foreign_keys=[shipper_id])


class ProductOrder(Base):
    __tablename__ = 'product_order'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey('order.id'), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey('product.id'), nullable=False)
    unit_price = Column(Numeric(12, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    discount = Column(Numeric(12, 2), nullable=False)
    order = relationship('Order', foreign_keys=[order_id])
    product = relationship('Product', foreign_keys=[product_id])
    __table_args__ = (
        UniqueConstraint(order_id, product_id, name='unique_product_order'),
    )


class ProductReview(Base):
    __tablename__ = 'product_review'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey('product.id'), nullable=False)
    score = Column(Integer, nullable=False)
    text = Column(Integer, nullable=False)
    user = relationship('User', foreign_keys=[user_id])
    product = relationship('Product', foreign_keys=[product_id])
    __table_args__ = (
        UniqueConstraint(user_id, product_id, name='unique_user_product'),
        CheckConstraint('score >= 1 AND score <= 5'),
    )
