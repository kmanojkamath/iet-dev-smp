from fastapi import FastAPI

from database import engine
from models import Base

from products import router as products_router
from categories import router as categories_router
from cart import router as cart_router
from orders import router as orders_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Commerce API")

app.include_router(products_router)
app.include_router(categories_router)
app.include_router(cart_router)
app.include_router(orders_router)


@app.get("/")
def root():
    return {"message": "E-Commerce API"}
