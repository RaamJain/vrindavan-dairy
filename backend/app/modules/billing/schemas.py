"""Pydantic schemas for billing requests."""

from pydantic import BaseModel


class GenerateBillRequest(BaseModel):
    """Request payload for generating a customer bill."""

    customer_id: int
    month: int
    year: int
