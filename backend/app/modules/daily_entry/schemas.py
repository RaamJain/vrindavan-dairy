"""Pydantic schemas for daily entry requests."""

from pydantic import BaseModel


class MilkData(BaseModel):
    """Milk quantities recorded for a customer."""

    cow: float
    buffalo: float


class ExtraItem(BaseModel):
    """Additional dairy product supplied to a customer."""

    product_name: str
    quantity: float


class DailyEntryRequest(BaseModel):
    """Request schema for creating or updating a daily entry."""

    customer_id: int
    customer_name: str
    customer_number: str

    date: str
    shift: str

    milk: MilkData
    extras: list[ExtraItem] = []
