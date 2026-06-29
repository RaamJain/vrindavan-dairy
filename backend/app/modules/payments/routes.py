from fastapi import APIRouter

from app.modules.payments.schemas import (
    PaymentRequest,
)

from app.modules.payments.service import (
    record_payment,
    get_customer_payment_summary,
    get_payment_history,
)


router = APIRouter()


@router.get(
    "/payments/customer-summary"
)
def customer_payment_summary(
    customer_id: int,
):
    return (
        get_customer_payment_summary(
            customer_id
        )
    )
    

@router.get(
    "/payments/history"
)
def payment_history(
    customer_id: int,
):
    return get_payment_history(
        customer_id
    )


@router.post(
    "/payments",
)
def create_payment(
    payload: PaymentRequest,
):
    return record_payment(
        customer_id=
            payload.customer_id,

        payment_amount=
            payload.payment_amount,

        mode=
            payload.mode,

        notes=
            payload.notes,
    )