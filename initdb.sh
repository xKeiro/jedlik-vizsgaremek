#!/usr/bin/env sh
. ./backend/.env

echo "Database Initializer Script"
echo "Generating '$POSTGRES_DB' database container with docker-compose..."
docker-compose up -d

echo "Waiting for docker container..."
sleep 10

echo "Adding extension..."
docker exec -it postgres psql -U $POSTGRES_USER -d $POSTGRES_DB -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

echo "Initializing database..."
. ./.venv/bin/activate
alembic revision --autogenerate -m "Init"
alembic upgrade head

echo "Seeding database..."
# docker cp ./localfile.sql containername:/container/path/file.sql
# docker exec -u postgresuser containername psql dbname postgresuser -f /container/path/file.sql

docker cp ./fake_db_data/address.sql postgres:/docker-entrypoint-initdb.d/address.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/address.sql

docker cp ./fake_db_data/user.sql postgres:/docker-entrypoint-initdb.d/user.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/user.sql

docker cp ./fake_db_data/supplier.sql postgres:/docker-entrypoint-initdb.d/supplier.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/supplier.sql

docker cp ./fake_db_data/product_category.sql postgres:/docker-entrypoint-initdb.d/product_category.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/product_category.sql

docker cp ./fake_db_data/product.sql postgres:/docker-entrypoint-initdb.d/product.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/product.sql

docker cp ./fake_db_data/product_supplier.sql postgres:/docker-entrypoint-initdb.d/product_supplier.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/product_supplier.sql

docker cp ./fake_db_data/shipper.sql postgres:/docker-entrypoint-initdb.d/shipper.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/shipper.sql

docker cp ./fake_db_data/order.sql postgres:/docker-entrypoint-initdb.d/order.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/order.sql

docker cp ./fake_db_data/product_order.sql postgres:/docker-entrypoint-initdb.d/product_order.sql
docker exec -u $POSTGRES_USER postgres psql $POSTGRES_DB postgres -f docker-entrypoint-initdb.d/product_order.sql

echo "Done."
