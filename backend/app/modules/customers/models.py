"""Database model for customer records."""

from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import String

from app.core.database import Base


class Customer(Base):
    """Represents a dairy customer."""

    __tablename__ = "customers"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    contact_number = Column(
        String(10),
        nullable=False,
    )

    address = Column(
        String,
        nullable=False,
        default="Satna",
    )

    account_balance = Column(
        Numeric(10, 2),
        nullable=False,
        default=0,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )
