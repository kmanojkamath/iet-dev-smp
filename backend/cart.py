from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import ProductDB

router = APIRouter(prefix="/cart", tags=["Cart"])

cart = []


@router.get("")
def get_cart():
    return cart


@router.post("/add/{product_id}")
def add_to_cart(product_id: int, db: Session = Depends(get_db)):
    product = (
        db.query(ProductDB)
        .filter(ProductDB.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    cart.append(product)

    return {"message": "Added to cart"}


@router.delete("/remove/{product_id}")
def remove_from_cart(product_id: int):
    for item in cart:
        if item.id == product_id:
            cart.remove(item)
            return {"message": "Removed from cart"}

    raise HTTPException(
        status_code=404,
        detail="Product not in cart"
    )
