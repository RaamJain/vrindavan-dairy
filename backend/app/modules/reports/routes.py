from fastapi import APIRouter

from app.modules.reports.services import (
    get_customer_monthly_report,
)

router = APIRouter()


@router.get(
    "/reports/customer-monthly"
)
def customer_monthly_report(
    customer_id: int,
    month: int,
    year: int,
):
    return get_customer_monthly_report(
        customer_id=customer_id,
        month=month,
        year=year,
    )