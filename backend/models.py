from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Float, JSON

Base = declarative_base()


class ProductDB(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=False)
    description = Column(String, nullable=False)


class CategoryDB(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)


class OrderDB(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    items = Column(JSON, nullable=False)
