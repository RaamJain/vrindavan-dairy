"""Service layer for processing and retrieving daily dairy entries."""

from app.modules.entries.service import (
    get_milk_entry,
    get_previous_entry,
    save_daily_entry,
)
from app.modules.extras.service import (
    get_extra_items,
    save_extra_item,
)


def process_daily_entry(
    customer_name: str,
    date: str,
    shift: str,
    cow_quantity: float,
    buffalo_quantity: float,
    extras: list,
) -> None:
    """Process and save a customer's daily milk and extras entry.

    Args:
        customer_name: Name of the customer.
        date: Entry date in DD-MM-YYYY format.
        shift: Milk collection shift.
        cow_quantity: Quantity of cow milk.
        buffalo_quantity: Quantity of buffalo milk.
        extras: List of additional products supplied.

    Returns:
        None.
    """

    day, month, year = map(
        int,
        date.split("-"),
    )

    save_daily_entry(
        customer_name=customer_name,
        cow_quantity=cow_quantity,
        buffalo_quantity=buffalo_quantity,
        year=year,
        month=month,
        day=day,
        shift=shift,
    )

    for extra in extras:
        save_extra_item(
            customer_name=customer_name,
            product_name=extra.product_name,
            quantity=extra.quantity,
            year=year,
            month=month,
            day=day,
            shift=shift,
        )


def get_autofill_values(
    customer_name: str,
    date: str,
    shift: str,
) -> dict:
    """Retrieve previous milk quantities for autofill.

    Args:
        customer_name: Name of the customer.
        date: Entry date in DD-MM-YYYY format.
        shift: Milk collection shift.

    Returns:
        A dictionary containing the previous cow and buffalo milk
        quantities.
    """

    day, month, year = map(
        int,
        date.split("-"),
    )

    cow = get_previous_entry(
        customer_name=customer_name,
        milk_type="Cow",
        year=year,
        month=month,
        day=day,
        shift=shift,
    )

    buffalo = get_previous_entry(
        customer_name=customer_name,
        milk_type="Buffalo",
        year=year,
        month=month,
        day=day,
        shift=shift,
    )

    return {
        "cow": cow,
        "buffalo": buffalo,
    }


def get_daily_entry(
    customer_name: str,
    date: str,
    shift: str,
) -> dict:
    """Retrieve a customer's daily milk and extras entry.

    Args:
        customer_name: Name of the customer.
        date: Entry date in DD-MM-YYYY format.
        shift: Milk collection shift.

    Returns:
        A dictionary containing the customer's milk quantities and
        additional products for the specified date and shift.
    """

    day, month, year = map(
        int,
        date.split("-"),
    )

    milk = get_milk_entry(
        customer_name=customer_name,
        year=year,
        month=month,
        day=day,
        shift=shift,
    )

    extras = get_extra_items(
        customer_name=customer_name,
        year=year,
        month=month,
        day=day,
        shift=shift,
    )

    return {
        "customer_name": customer_name.capitalize(),
        "date": date,
        "shift": shift.capitalize(),
        "milk": milk,
        "extras": extras,
    }