from pydantic import BaseModel


class Product(BaseModel):
    id: int
    name: str
    category: str
    price: float
    image: str
    description: str

    class Config:
        from_attributes = True


class Category(BaseModel):
    name: str

    class Config:
        from_attributes = True
