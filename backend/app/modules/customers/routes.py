"""API routes for managing customers."""

from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.modules.customers.models import Customer
from app.modules.customers.schemas import (
    CustomerCreateRequest,
    CustomerResponse,
    CustomerStatusRequest,
    CustomerUpdateRequest,
)

router = APIRouter()


@router.post("/customers")
def create_customer(
    payload: CustomerCreateRequest,
) -> dict:
    """Create a new customer.

    Args:
        payload: Customer details.

    Returns:
        A success or error message.
    """

    db: Session = SessionLocal()

    try:
        existing_customer = (
            db.query(Customer)
            .filter(
                Customer.contact_number == payload.contact_number,
                Customer.name == payload.name,
            )
            .first()
        )

        if existing_customer is not None:
            return {
                "message": "Customer already exists",
            }

        customer = Customer(
            name=payload.name.title(),
            contact_number=payload.contact_number,
            address=(
                payload.address.title()
                if payload.address.strip()
                else "Satna"
            ),
            account_balance=payload.account_balance,
        )

        db.add(customer)
        db.commit()

        return {
            "message": "Customer created successfully",
        }

    finally:
        db.close()


@router.patch("/customers/edit")
def update_customer(
    customer_id: int,
    payload: CustomerUpdateRequest,
) -> dict:
    """Update an existing customer.

    Args:
        customer_id: Customer identifier.
        payload: Updated customer details.

    Returns:
        A success or error message.
    """

    db: Session = SessionLocal()

    try:
        customer = (
            db.query(Customer)
            .filter(
                Customer.id == customer_id,
            )
            .first()
        )

        if customer is None:
            return {
                "message": "Customer not found",
            }

        existing_customer = (
            db.query(Customer)
            .filter(
                Customer.contact_number == payload.contact_number,
                Customer.name == payload.name,
                Customer.id != customer_id,
            )
            .first()
        )

        if existing_customer is not None:
            return {
                "message": "Contact number already exists",
            }

        customer.name = payload.name.title()
        customer.contact_number = payload.contact_number
        customer.address = (
            payload.address.title()
            if payload.address.strip()
            else "Satna"
        )
        customer.account_balance = payload.account_balance

        db.commit()

        return {
            "message": "Customer updated successfully",
        }

    finally:
        db.close()


@router.get(
    "/customers",
    response_model=list[CustomerResponse],
)
def get_customers() -> list[Customer]:
    """Return all active customers.

    Returns:
        A list of active customers.
    """

    db: Session = SessionLocal()

    try:
        return (
            db.query(Customer)
            .filter(
                Customer.is_active.is_(True),
            )
            .all()
        )

    finally:
        db.close()


@router.get(
    "/customers/search-all",
    response_model=list[CustomerResponse],
)
def search_all_customers(
    name: str,
) -> list[Customer]:
    """Search all customers by name.

    Args:
        name: Customer name or partial name.

    Returns:
        Matching customers.
    """

    db: Session = SessionLocal()

    try:
        return (
            db.query(Customer)
            .filter(
                Customer.name.ilike(
                    f"%{name}%",
                ),
            )
            .all()
        )

    finally:
        db.close()


@router.get(
    "/customers/search",
    response_model=list[CustomerResponse],
)
def search_customers(
    query: str,
) -> list[Customer]:
    """Search active customers by name.

    Args:
        query: Customer name or partial name.

    Returns:
        Matching active customers.
    """

    db: Session = SessionLocal()

    try:
        return (
            db.query(Customer)
            .filter(
                Customer.is_active.is_(True),
                Customer.name.ilike(
                    f"%{query}%",
                ),
            )
            .all()
        )

    finally:
        db.close()


@router.get(
    "/customers/search-inactive",
    response_model=list[CustomerResponse],
)
def search_inactive_customers(
    query: str,
) -> list[Customer]:
    """Search inactive customers by name.

    Args:
        query: Customer name or partial name.

    Returns:
        Matching inactive customers.
    """

    db: Session = SessionLocal()

    try:
        return (
            db.query(Customer)
            .filter(
                Customer.is_active.is_(False),
                Customer.name.ilike(
                    f"%{query}%",
                ),
            )
            .all()
        )

    finally:
        db.close()


@router.patch("/customers/deactivate")
def deactivate_customer(
    payload: CustomerStatusRequest,
) -> dict:
    """Deactivate an existing customer.

    Args:
        payload: Customer identification details.

    Returns:
        A success or error message.
    """

    db: Session = SessionLocal()

    try:
        customer = (
            db.query(Customer)
            .filter(
                Customer.name == payload.name.title(),
                Customer.contact_number == payload.contact_number,
            )
            .first()
        )

        if customer is None:
            return {
                "message": "Customer not found",
            }

        customer.is_active = False

        db.commit()

        return {
            "message": "Customer deactivated",
        }

    finally:
        db.close()


@router.patch("/customers/activate")
def activate_customer(
    payload: CustomerStatusRequest,
) -> dict:
    """Activate an existing customer.

    Args:
        payload: Customer identification details.

    Returns:
        A success or error message.
    """

    db: Session = SessionLocal()

    try:
        customer = (
            db.query(Customer)
            .filter(
                Customer.name == payload.name.title(),
                Customer.contact_number == payload.contact_number,
            )
            .first()
        )

        if customer is None:
            return {
                "message": "Customer not found",
            }

        customer.is_active = True

        db.commit()

        return {
            "message": "Customer activated",
        }

    finally:
        db.close()
