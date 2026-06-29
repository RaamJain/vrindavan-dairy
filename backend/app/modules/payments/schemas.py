from pydantic import BaseModel


class PaymentRequest(
    BaseModel,
):
    customer_id: int

    payment_amount: float

    mode: str

    notes: str = ""