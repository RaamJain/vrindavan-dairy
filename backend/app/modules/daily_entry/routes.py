"""API routes for recording and retrieving daily dairy entries."""

from fastapi import APIRouter

from app.modules.daily_entry.schemas import (
    DailyEntryRequest,
)
from app.modules.entries.service import (
    get_autofill_data,
    save_daily_entry,
)

router = APIRouter()


@router.post("/daily-entry")
def create_daily_entry(
    payload: DailyEntryRequest,
) -> dict:
    """Create or update a daily dairy entry.

    Args:
        payload: Daily entry details including milk quantities
            and extra products.

    Returns:
        A success or error message.
    """

    return save_daily_entry(
        customer_id=payload.customer_id,
        customer_name=payload.customer_name,
        date=payload.date,
        shift=payload.shift,
        cow_quantity=payload.milk.cow,
        buffalo_quantity=payload.milk.buffalo,
        extras=payload.extras,
    )


@router.get("/daily-entry/autofill")
def get_daily_entry_autofill(
    customer_id: int,
    date: str,
    shift: str,
) -> dict:
    """Retrieve previously recorded values for autofill.

    Args:
        customer_id: Customer identifier.
        date: Entry date in YYYY-MM-DD format.
        shift: Milk collection shift.

    Returns:
        Previously recorded milk quantities and extras for the
        specified customer, date, and shift.
    """

    return get_autofill_data(
        customer_id=customer_id,
        date=date,
        shift=shift,
    )
