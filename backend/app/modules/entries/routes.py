"""API routes for managing milk entries."""

from fastapi import APIRouter
from pydantic import BaseModel

from app.modules.entries.service import save_daily_entry

router = APIRouter()


class MilkEntryRequest(BaseModel):
    """Request schema for recording a milk entry."""

    customer_name: str
    date: str
    cow_quantity: float
    buffalo_quantity: float
    shift: str


@router.post("/entries")
def create_entry(
    payload: MilkEntryRequest,
) -> dict:
    """Create a milk entry for a customer.

    Args:
        payload: Milk entry details.

    Returns:
        A success message after the entry is saved.
    """

    day, month, year = map(
        int,
        payload.date.split("-"),
    )

    save_daily_entry(
        customer_name=payload.customer_name,
        cow_quantity=payload.cow_quantity,
        buffalo_quantity=payload.buffalo_quantity,
        year=year,
        month=month,
        day=day,
        shift=payload.shift,
    )

    return {
        "message": "Entry saved successfully",
    }
