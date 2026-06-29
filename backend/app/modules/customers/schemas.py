"""Pydantic schemas for customer-related API requests and responses."""

from pydantic import BaseModel
from pydantic import ConfigDict


class CustomerCreateRequest(BaseModel):
    """Request schema for creating a customer."""

    name: str
    contact_number: str
    address: str = ""
    account_balance: float = 0.0


class CustomerStatusRequest(BaseModel):
    """Request schema for activating or deactivating a customer."""

    name: str
    contact_number: str


class CustomerUpdateRequest(BaseModel):
    """Request schema for updating customer details."""

    name: str
    contact_number: str
    address: str = ""
    account_balance: float


class CustomerResponse(BaseModel):
    """Response schema representing a customer."""

    id: int
    name: str
    contact_number: str
    address: str
    account_balance: float

    model_config = ConfigDict(
        from_attributes=True,
    )