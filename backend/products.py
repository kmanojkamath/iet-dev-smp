from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import ProductDB
from schemas import Product

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("")
def get_products(db: Session = Depends(get_db)):
    return db.query(ProductDB).all()


@router.get("/{id}")
def get_product(id: int, db: Session = Depends(get_db)):
    product = (
        db.query(ProductDB)
        .filter(ProductDB.id == id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@router.post("")
def add_product(
    product: Product,
    db: Session = Depends(get_db)
):
    existing = (
        db.query(ProductDB)
        .filter(ProductDB.id == product.id)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Product ID already exists"
        )

    new_product = ProductDB(
        **product.model_dump()
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.put("/{id}")
def update_product(
    id: int,
    updated_product: Product,
    db: Session = Depends(get_db)
):
    product = (
        db.query(ProductDB)
        .filter(ProductDB.id == id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.name = updated_product.name
    product.category = updated_product.category
    product.price = updated_product.price
    product.image = updated_product.image
    product.description = updated_product.description

    db.commit()
    db.refresh(product)

    return product


@router.delete("/{id}")
def delete_product(
    id: int,
    db: Session = Depends(get_db)
):
    product = (
        db.query(ProductDB)
        .filter(ProductDB.id == id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {"message": "Product deleted"}
