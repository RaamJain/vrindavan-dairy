"""API routes for bill generation and bill preview operations."""

from fastapi import APIRouter

from app.modules.billing.service import (
    generate_bill,
    get_all_bill_previews,
    get_bill_preview,
)

router = APIRouter()


@router.post("/billing/generate")
def generate_customer_bill(
    customer_id: int,
    month: int,
    year: int,
):
    """Generate or regenerate a customer's bill."""

    return generate_bill(
        customer_id=customer_id,
        month=month,
        year=year,
    )


@router.get("/billing/preview")
def billing_preview(
    customer_id: int,
    month: int,
    year: int,
):
    """Return the bill preview for a customer."""

    return get_bill_preview(
        customer_id=customer_id,
        month=month,
        year=year,
    )


@router.get("/billing/bulk-preview")
def bulk_bill_preview(
    month: int,
    year: int,
):
    """Return bill previews for all eligible customers."""

    return get_all_bill_previews(
        month=month,
        year=year,
    )
