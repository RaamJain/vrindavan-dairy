import type {
    BillPreview,
} from "../types/billPreview";

interface Props {
    bill: BillPreview;
}

export default function DetailedBillCard(
    {
        bill,
    }: Props,
) {
    const showMorningCow =
        bill.daily_ledger.some(
        (
            entry,
        ) =>
            entry.morning_cow > 0,
    );

    const showMorningBuffalo =
        bill.daily_ledger.some(
            (
                entry,
            ) =>
                entry.morning_buffalo > 0,
        );

    const showEveningCow =
        bill.daily_ledger.some(
            (
                entry,
            ) =>
                entry.evening_cow > 0,
        );

    const showEveningBuffalo =
        bill.daily_ledger.some(
            (
                entry,
            ) =>
                entry.evening_buffalo > 0,
        );

    return (

        <div
            className="
                border
                rounded
                p-4
                space-y-6
            "
        >

            <h2
                className="
                    text-2xl
                    font-bold
                "
            >
                Detailed Bill
            </h2>

            {/* Customer Information Block */}
            <div
                className="
                    border
                    rounded
                    p-4
                    bg-green-50
                "
            >

                <h3
                    className="
                        text-xl
                        font-semibold
                        mb-3
                    "
                >
                    Customer Information
                </h3>

                <div>
                    <strong>
                        Name:
                    </strong>
                    {" "}
                    {bill.customer.name}
                </div>

                <div>
                    <strong>
                        Phone:
                    </strong>
                    {" "}
                    {bill.customer.contact_number}
                </div>

                <div>
                    <strong>
                        Address:
                    </strong>
                    {" "}
                    {bill.customer.address}
                </div>

                {bill.account_balance > 0 && (

                    <div
                        className="
                            text-red-700
                            font-semibold
                            mt-3
                        "
                    >
                        Outstanding Balance:
                        {" "}
                        ₹
                        {
                            bill.account_balance
                        }
                    </div>

                    )}

                    {bill.account_balance < 0 && (

                    <div
                        className="
                            text-green-700
                            font-semibold
                            mt-3
                        "
                    >
                        Advance Credit:
                        {" "}
                        ₹
                        {
                            Math.abs(
                                bill.account_balance,
                            )
                        }
                    </div>

                    )}

                    {bill.account_balance === 0 && (

                    <div
                        className="
                            font-semibold
                            mt-3
                        "
                    >
                        Account Settled
                    </div>

                    )}

            </div>

            {/* Daily Milk Ledger */}
            
            <div
                className="
                    border
                    rounded
                    p-4
                "
            >

                <h3
                    className="
                        text-xl
                        font-semibold
                        mb-3
                    "
                >
                    Daily Milk Ledger
                </h3>

                <table
                    className="
                        w-full
                        border-collapse
                    "
                >

                    <thead>

                        <tr
                            className="
                                border-b
                            "
                        >

                            <th
                                className="
                                    text-left
                                    p-2
                                "
                            >
                                Day
                            </th>

                            {showMorningCow && (

                                <th
                                    className="
                                        text-left
                                        p-2
                                    "
                                >
                                    Morning Cow
                                </th>

                            )}

                            {showMorningBuffalo && (

                                <th
                                    className="
                                        text-left
                                        p-2
                                    "
                                >
                                    Morning Buffalo
                                </th>

                            )}

                            {showEveningCow && (

                                <th
                                    className="
                                        text-left
                                        p-2
                                    "
                                >
                                    Evening Cow
                                </th>

                            )}

                            {showEveningBuffalo && (

                                <th
                                    className="
                                        text-left
                                        p-2
                                    "
                                >
                                    Evening Buffalo
                                </th>

                            )}

                        </tr>

                    </thead>

                    <tbody>

                        {bill.daily_ledger.map(
                            (
                                entry,
                            ) => (

                                <tr
                                    key={
                                        entry.day
                                    }
                                    className="
                                        border-b
                                    "
                                >

                                    <td
                                        className="
                                            p-2
                                        "
                                    >
                                        {
                                            entry.day
                                        }
                                    </td>

                                    {showMorningCow && (

                                        <td
                                            className="
                                                p-2
                                            "
                                        >
                                            {
                                                entry.morning_cow
                                            }
                                        </td>

                                    )}

                                    {showMorningBuffalo && (

                                        <td
                                            className="
                                                p-2
                                            "
                                        >
                                            {
                                                entry.morning_buffalo
                                            }
                                        </td>

                                    )}

                                    {showEveningCow && (

                                        <td
                                            className="
                                                p-2
                                            "
                                        >
                                            {
                                                entry.evening_cow
                                            }
                                        </td>

                                    )}

                                    {showEveningBuffalo && (

                                        <td
                                            className="
                                                p-2
                                            "
                                        >
                                            {
                                                entry.evening_buffalo
                                            }
                                        </td>

                                    )}

                                </tr>

                            ),
                        )}

                    </tbody>

                </table>

            </div>

            {/* Milk Summary Block */}
            
            <div
                className="
                    border
                    rounded
                    p-4
                "
            >

                <h3
                    className="
                        text-xl
                        font-semibold
                        mb-3
                    "
                >
                    Milk Summary
                </h3>

                {
                    bill.milk_summary
                        .cow_total > 0 && (

                        <div>
                            Cow:
                            {" "}
                            {
                                bill
                                    .milk_summary
                                    .cow_total
                            }
                            {" "}L
                            {" "}
                            (
                            ₹
                            {
                                bill
                                    .milk_summary
                                    .cow_amount
                            }
                            )
                        </div>

                    )
                }

                {
                    bill.milk_summary
                        .buffalo_total > 0 && (

                        <div>
                            Buffalo:
                            {" "}
                            {
                                bill
                                    .milk_summary
                                    .buffalo_total
                            }
                            {" "}L
                            {" "}
                            (
                            ₹
                            {
                                bill
                                    .milk_summary
                                    .buffalo_amount
                            }
                            )
                        </div>

                    )
                }

                <div
                    className="
                        font-semibold
                        mt-3
                    "
                >
                    Total Milk Amount:
                    {" "}
                    ₹
                    {
                        bill
                            .milk_summary
                            .milk_amount
                    }
                </div>

            </div>

            {/* Daily Products */}

            {
                bill.extras.length > 0 && (

                    <div
                        className="
                            border
                            rounded
                            p-4
                        "
                    >

                        <h3
                            className="
                                text-xl
                                font-semibold
                                mb-4
                            "
                        >
                            Dairy Products
                        </h3>

                        <div
                            className="
                                space-y-6
                            "
                        >

                            {bill.extras.map(
                                (
                                    extra,
                                ) => (

                                    <div
                                        key={
                                            extra.product_name
                                        }
                                        className="
                                            border
                                            rounded
                                            p-4
                                        "
                                    >

                                        <h4
                                            className="
                                                text-lg
                                                font-semibold
                                                mb-3
                                            "
                                        >
                                            {
                                                extra.product_name
                                            }
                                        </h4>

                                        <table
                                            className="
                                                w-full
                                                border-collapse
                                                mb-3
                                            "
                                        >

                                            <thead>

                                                <tr
                                                    className="
                                                        border-b
                                                    "
                                                >

                                                    <th
                                                        className="
                                                            text-left
                                                            p-2
                                                        "
                                                    >
                                                        Date
                                                    </th>

                                                    <th
                                                        className="
                                                            text-left
                                                            p-2
                                                        "
                                                    >
                                                        Quantity
                                                    </th>

                                                    <th
                                                        className="
                                                            text-left
                                                            p-2
                                                        "
                                                    >
                                                        Amount
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {extra.entries.map(
                                                    (
                                                        entry,
                                                        index,
                                                    ) => (

                                                        <tr
                                                            key={
                                                                index
                                                            }
                                                            className="
                                                                border-b
                                                            "
                                                        >

                                                            <td
                                                                className="
                                                                    p-2
                                                                "
                                                            >
                                                                {
                                                                    entry.date
                                                                }
                                                            </td>

                                                            <td
                                                                className="
                                                                    p-2
                                                                "
                                                            >
                                                                {
                                                                    entry.quantity
                                                                }
                                                            </td>

                                                            <td
                                                                className="
                                                                    p-2
                                                                "
                                                            >
                                                                ₹
                                                                {
                                                                    (
                                                                        entry.quantity
                                                                        / 1000
                                                                    )
                                                                    * extra.rate
                                                                }
                                                            </td>

                                                        </tr>

                                                    ),
                                                )}

                                            </tbody>

                                        </table>

                                        <div>
                                            <strong>
                                                Total Quantity:
                                            </strong>
                                            {" "}
                                            {
                                                extra.total_quantity
                                            }
                                            {" "}
                                            grams
                                        </div>

                                        <div
                                            className="
                                                font-semibold
                                                mt-2
                                            "
                                        >
                                            Total Amount:
                                            {" "}
                                            ₹
                                            {
                                                extra.amount
                                            }
                                        </div>

                                    </div>

                                ),
                            )}

                        </div>

                    </div>

                )
            }

            
            {/* Billing Summary */}


            <div
                className="
                    border
                    rounded
                    p-4
                    bg-green-50
                "
            >

                <h3
                    className="
                        text-xl
                        font-semibold
                        mb-4
                    "
                >
                    Billing Summary
                </h3>

                <div
                    className="
                        space-y-2
                    "
                >

                <div
                    className="
                        flex
                        justify-between
                    "
                >
                    <span>
                        Monthly Total
                    </span>

                    <span>
                        ₹
                        {
                            bill.monthly_total
                                .toFixed(2)
                        }
                    </span>
                </div>

                <div
                    className="
                        flex
                        justify-between
                    "
                >
                    <span>
                        Payments Received
                    </span>

                    <span>
                        ₹
                        {
                            bill.payments_received
                                .toFixed(2)
                        }
                    </span>
                </div>

                {bill.previous_dues > 0 && (

                    <div
                        className="
                            flex
                            justify-between
                            font-bold
                        "
                    >
                        <span>
                            Outstanding Balance
                        </span>

                        <span
                            className="
                                text-red-700
                            "
                        >
                            +₹
                            {
                                bill.previous_dues
                                    .toFixed(2)
                            }
                        </span>
                    </div>

                )}

                {bill.previous_dues < 0 && (

                    <div
                        className="
                            flex
                            justify-between
                            font-bold
                        "
                    >
                        <span>
                            Advance Credit
                        </span>

                        <span
                            className="
                                text-green-700
                            "
                        >
                            -₹
                            {
                                Math.abs(
                                    bill.previous_dues,
                                ).toFixed(2)
                            }
                        </span>
                    </div>

                )}

                {bill.previous_dues === 0 && (

                    <div
                        className="
                            flex
                            justify-between
                            font-bold
                        "
                    >
                        <span>
                            Previous Balance
                        </span>

                        <span>
                            ₹0.00
                        </span>
                    </div>

                )}

                <hr />

                <div
                    className="
                        flex
                        justify-between
                        text-lg
                        font-bold
                    "
                >

                    <span>
                        Final Total
                    </span>

                    <span
                        className={
                            bill.account_balance > 0
                                ? "text-red-700"
                                : bill.account_balance < 0
                                ? "text-green-700"
                                : ""
                        }
                    >
                        ₹
                        {
                            bill.account_balance.toFixed(2)
                        }
                    </span>

                </div>
                <div
                    className="
                        mt-4
                        pt-3
                        border-t
                        text-xs
                        text-gray-500
                        italic
                    "
                >
                    * Final Total includes previous paid amounts and the account balance.
                </div>

            </div>

            </div>
        </div>

    );
}