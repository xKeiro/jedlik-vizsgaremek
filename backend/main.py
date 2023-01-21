from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import settings
from backend.routers import auth
from backend.routers import orders
from backend.routers import product_categories
from backend.routers import products
from backend.routers import user

app = FastAPI()

origins = [
    settings.CLIENT_ORIGIN,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=['Auth'], prefix='/api/auth')
app.include_router(user.router, tags=['Users'], prefix='/api/users')
app.include_router(product_categories.router, tags=['Product Categories'], prefix='/api/categories')
app.include_router(products.router, tags=['Products'], prefix='/api/products')
app.include_router(orders.router, tags=['Orders'], prefix='/api/orders')


@app.get('/api/healthchecker')
def root():
    return {'message': 'Hello World'}
