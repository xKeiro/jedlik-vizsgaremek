"""initialize db

Revision ID: a2a8a0a5b1b3
Revises: 
Create Date: 2022-10-20 19:52:01.475628

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a2a8a0a5b1b3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('address',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('address', sa.String(length=50), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('region', sa.String(length=50), nullable=False),
    sa.Column('postal_code', sa.String(length=10), nullable=False),
    sa.Column('country', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product_category',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('title', sa.String(length=150), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('photo', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shipper',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('phone', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('price', sa.Numeric(precision=12, scale=2), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('product',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('category_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('sale_price', sa.Numeric(precision=12, scale=2), nullable=False),
    sa.Column('title', sa.String(length=150), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('photo', sa.String(length=250), nullable=True),
    sa.Column('stock', sa.Integer(), server_default='0', nullable=False),
    sa.Column('discontinued', sa.Boolean(), server_default='False', nullable=False),
    sa.Column('featured', sa.Boolean(), server_default='False', nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['product_category.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('supplier',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('company_name', sa.String(length=75), nullable=False),
    sa.Column('contact_first_name', sa.String(length=25), nullable=True),
    sa.Column('contact_last_name', sa.String(length=25), nullable=True),
    sa.Column('phone', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('address_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.ForeignKeyConstraint(['address_id'], ['address.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('user',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('username', sa.String(length=25), nullable=False),
    sa.Column('first_name', sa.String(length=25), nullable=False),
    sa.Column('last_name', sa.String(length=25), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=50), nullable=False),
    sa.Column('phone', sa.String(length=20), nullable=True),
    sa.Column('address_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('photo', sa.String(length=250), nullable=True),
    sa.Column('is_admin', sa.Boolean(), server_default='False', nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['address_id'], ['address.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('order',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('shipper_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('vat', sa.Numeric(precision=2, scale=2), server_default='0', nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('order_date', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.CheckConstraint("status IN ('in progress', 'under procurement', 'fulfilled', 'deleted')"),
    sa.ForeignKeyConstraint(['shipper_id'], ['shipper.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product_review',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('product_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('score', sa.Integer(), nullable=False),
    sa.Column('text', sa.Integer(), nullable=False),
    sa.CheckConstraint('score >= 1 AND score <= 5'),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'product_id', name='unique_user_product')
    )
    op.create_table('product_supplier',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('product_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('supplier_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('purchase_price', sa.Numeric(precision=12, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.ForeignKeyConstraint(['supplier_id'], ['supplier.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('product_id', 'supplier_id', name='unique_product_supplier')
    )
    op.create_table('product_order',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('order_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('product_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('unit_price', sa.Numeric(precision=12, scale=2), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('discount', sa.Numeric(precision=12, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['order.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('order_id', 'product_id', name='unique_product_order')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('product_order')
    op.drop_table('product_supplier')
    op.drop_table('product_review')
    op.drop_table('order')
    op.drop_table('user')
    op.drop_table('supplier')
    op.drop_table('product')
    op.drop_table('shipper')
    op.drop_table('product_category')
    op.drop_table('address')
    # ### end Alembic commands ###
