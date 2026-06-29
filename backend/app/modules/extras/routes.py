from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel

from app.modules.extras.service import save_extra_item


router = APIRouter()


class ExtraItemRequest(BaseModel):
    customer_name: str
    product_name: str
    quantity: float
    shift: str


@router.post("/extras")
def create_extra_item(payload: ExtraItemRequest):
    now = datetime.now()
    save_extra_item(
        customer_name=payload.customer_name,
        product_name=payload.product_name,
        quantity=payload.quantity,
        year=now.year,
        month=now.month,
        day=now.day,
        shift=payload.shift,
    )

    return {"message": "Extra item saved successfully"}
