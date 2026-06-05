from fastapi import APIRouter, HTTPException

from cart import cart

from fastapi import Depends
from sqlalchemy.orm import Session

from database import get_db
from models import OrderDB

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

orders = []


@router.post("")
def add_order(db: Session = Depends(get_db)):
    order = OrderDB(
        items=[
            {
                "id": item.id,
                "name": item.name,
                "category": item.category,
                "price": item.price,
                "image": item.image,
                "description": item.description
            }
            for item in cart
        ]
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    cart.clear()
    return order


@router.get("")
def get_orders(db: Session = Depends(get_db)):
    return db.query(OrderDB).all()


@router.get("/{id}")
def get_order(id: int, db: Session = Depends(get_db)):
    order = (
        db.query(OrderDB)
        .filter(OrderDB.id == id)
        .first()
    )
    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )
    return order
