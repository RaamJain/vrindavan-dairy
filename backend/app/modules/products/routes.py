from decimal import Decimal

from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.modules.products.models import Product
from app.modules.products.schemas import (
    ProductCreateRequest,
    ProductPriceUpdateRequest,
    ProductResponse,
)

router = APIRouter()


@router.post("/products")
def create_product(
    payload: ProductCreateRequest,
):
    db: Session = SessionLocal()

    try:
        existing_product = (
            db.query(Product)
            .filter(
                Product.name == payload.name.title()
            )
            .first()
        )

        if existing_product:
            return {
                "message": "Product already exists"
            }

        product = Product(
            name=payload.name.title(),
            unit=payload.unit.title(),
            rate=Decimal(str(payload.rate)),
        )

        db.add(product)

        db.commit()

        return {
            "message": "Product created successfully"
        }

    finally:
        db.close()


@router.get(
    "/products",
    response_model=list[ProductResponse],
)
def get_products():
    db: Session = SessionLocal()

    try:
        return (
            db.query(Product)
            .order_by(Product.name)
            .all()
        )

    finally:
        db.close()


@router.get(
    "/products/search",
    response_model=list[ProductResponse],
)
def search_products(
    query: str,
):
    db: Session = SessionLocal()

    try:
        return (
            db.query(Product)
            .filter(
                Product.name.ilike(
                    f"%{query}%"
                )
            )
            .order_by(Product.name)
            .all()
        )

    finally:
        db.close()


@router.patch(
    "/products/update-price"
)
def update_product_price(
    payload: ProductPriceUpdateRequest,
):
    db: Session = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(
                Product.name
                == payload.name.title()
            )
            .first()
        )

        if not product:
            return {
                "message": "Product not found"
            }

        product.rate = Decimal(str(payload.rate))

        db.commit()

        return {
            "message": "Price updated successfully"
        }

    finally:
        db.close()