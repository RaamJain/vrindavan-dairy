from decimal import Decimal

from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String,
        nullable=False,
        unique=True,
    )

    unit: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    rate: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )