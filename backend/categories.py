from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import CategoryDB
from schemas import Category

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.get("")
def get_categories(
    db: Session = Depends(get_db)
):
    return db.query(CategoryDB).all()


@router.post("")
def add_category(
    category: Category,
    db: Session = Depends(get_db)
):
    new_category = CategoryDB(
        name=category.name
    )

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category
