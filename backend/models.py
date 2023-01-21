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
                server_default=text("uuid_generate_v4()"))
    address = Column(String(50), nullable=False)
    city = Column(String(50), nullable=False)
    region = Column(String(50), nullable=False)
    postal_code = Column(String(10), nullable=False)
    country = Column(String(4), nullable=False)


class User(Base):
    __tablename__ = 'user'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                server_default=text("uuid_generate_v4()"))
    username = Column(String(25), unique=True, nullable=False)
    first_name = Column(String(25), nullable=False)
    last_name = Column(String(25), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(60), nullable=False)
    phone = Column(String(20), nullable=True)
    address_id = Column(UUID(as_uuid=True), ForeignKey('address.id', ondelete='CASCADE'), nullable=False)
    photo = Column(String(250), nullable=True)
    is_admin = Column(Boolean, server_default='False', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))
    address = relationship('Address')


class Supplier(Base):
    __tablename__ = 'supplier'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                server_default=text("uuid_generate_v4()"))
    company_name = Column(String(75), nullable=False)
    contact_first_name = Column(String(25), nullable=True)
    contact_last_name = Column(String(25), nullable=True)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    address_id = Column(UUID(as_uuid=True), ForeignKey('address.id', ondelete='CASCADE'), nullable=False)
    address = relationship('Address')


class ProductCategory(Base):
    __tablename__ = 'product_category'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                server_default=text("uuid_generate_v4()"))
    title = Column(String(150), nullable=False)
    description = Column(String, nullable=False)
    photo = Column(String(250), nullable=True)


class Product(Base):
    __tablename__ = 'product'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                server_default=text("uuid_generate_v4()"))
    category_id = Column(UUID(as_uuid=True), ForeignKey('product_category.id'), nullable=False)
    sale_price = Column(Numeric(12, 2), nullable=False)
    title = Column(String(150), nullable=False)
    description = Column(String, nullable=False)
    photo = Column(String(250), nullable=True)
    stock = Column(Integer, nullable=False, server_default="0")
    discontinued = Column(Boolean, server_default="False", nullable=False)
    featured = Column(Boolean, server_default="False", nullable=False)
    product_category = relationship('ProductCategory')


class ProductSupplier(Base):
    __tablename__ = 'product_supplier'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                server_default=text("uuid_generate_v4()"))
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
                server_default=text("uuid_generate_v4()"))
    company_name = Column(String(75), nullable=False)
    contact_first_name = Column(String(25), nullable=True)
    contact_last_name = Column(String(25), nullable=True)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    price = Column(Numeric(12, 2), nullable=False)


class Order(Base):
    __tablename__ = 'order'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                server_default=text("uuid_generate_v4()"))
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=False)
    shipper_id = Column(UUID(as_uuid=True), ForeignKey('shipper.id'), nullable=False)
    vat = Column(Numeric(2, 2), nullable=False, server_default="0")
    status = Column(String(20), nullable=False)
    order_date = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))
    user = relationship('User', foreign_keys=[user_id])
    shipper = relationship('Shipper', foreign_keys=[shipper_id])
    __table_args__ = (
        CheckConstraint("status IN ('in progress', 'under procurement', 'fulfilled', 'deleted')"),
    )


class ProductOrder(Base):
    __tablename__ = 'product_order'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                server_default=text("uuid_generate_v4()"))
    order_id = Column(UUID(as_uuid=True), ForeignKey('order.id'), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey('product.id'), nullable=False)
    unit_price = Column(Numeric(12, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    discount = Column(Numeric(2, 2), nullable=False, server_default="0")
    order = relationship('Order', foreign_keys=[order_id])
    product = relationship('Product', foreign_keys=[product_id])
    __table_args__ = (
        UniqueConstraint(order_id, product_id, name='unique_product_order'),
    )


class ProductReview(Base):
    __tablename__ = 'product_review'
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False,
                server_default=text("uuid_generate_v4()"))
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
