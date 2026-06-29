import { useState } from "react";

import CustomerSearch from "../components/CustomerSearch";
import { getCustomerMonthlyReport } from "../api/report";

import type {
    CustomerReport,
} from "../types/report";

import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";

export default function ReportsPage() {

    const [customerId, setCustomerId] =
        useState(0);

    const [customerName, setCustomerName] =
        useState("");

    const [month, setMonth] =
        useState(
            new Date().getMonth() + 1,
        );

    const [year, setYear] =
        useState(
            new Date().getFullYear(),
        );

    const [report, setReport] =
        useState<CustomerReport | null>(
            null,
        );
    
    const [error, setError] =
        useState("");

    async function generateReport() {

        setError("");
        if (customerId === 0) {
            return;
        }
    
        const data =
            await getCustomerMonthlyReport(
                customerId,
                month,
                year,
            );
        
        
        if (
            data.message
        ) {
            setReport(null);
            setError(
                data.message,
            );
            return;
        }
        setReport(data);
    }

    const showMorningCow =
        report?.daily_ledger.some(
            (entry) =>
                entry.morning_cow > 0,
        );

    const showMorningBuffalo =
        report?.daily_ledger.some(
            (entry) =>
                entry.morning_buffalo > 0,
        );

    const showEveningCow =
        report?.daily_ledger.some(
            (entry) =>
                entry.evening_cow > 0,
        );

    const showEveningBuffalo =
        report?.daily_ledger.some(
            (entry) =>
                entry.evening_buffalo > 0,
        );

    return (
        <PageLayout 
            title="Monthly Supplies Reports"
            description="Generate customer-wise monthly milk and billing reports."
        >

            <SectionCard
                title="Generate Report"
            >
                <div className="space-y-4">

                    <CustomerSearch
                        value={customerName}
                        onChange={
                            setCustomerName
                        }
                        onSelect={(customer) => {

                            setCustomerId(
                                customer.id,
                            );

                            setCustomerName(
                                customer.name,
                            );
                        }}
                    />

                    <select

                        value={month}

                        onChange={(e) =>

                            setMonth(

                                Number(

                                    e.target.value,

                                ),

                            )

                        }

                        className="

                            w-full

                            border

                            rounded

                            p-2

                        "

                    >

                        <option value={1}>

                            January

                        </option>

                        <option value={2}>

                            February

                        </option>

                        <option value={3}>

                            March

                        </option>

                        <option value={4}>

                            April

                        </option>

                        <option value={5}>

                            May

                        </option>

                        <option value={6}>

                            June

                        </option>

                        <option value={7}>

                            July

                        </option>

                        <option value={8}>

                            August

                        </option>

                        <option value={9}>

                            September

                        </option>

                        <option value={10}>

                            October

                        </option>

                        <option value={11}>

                            November

                        </option>

                        <option value={12}>

                            December

                        </option>

                    </select>

                    <input
                        type="number"
                        value={year}
                        onChange={(e) =>
                            setYear(
                                Number(
                                    e.target.value,
                                ),
                            )
                        }
                        className="
                            w-full
                            border
                            rounded
                            p-2
                        "
                    />

                    <button
                        type="button"
                        onClick={
                            generateReport
                        }
                        className="
                            bg-green-700
                            text-white
                            px-4
                            py-2
                            rounded
                        "
                    >
                        Generate Report
                    </button>
                </div>

            </SectionCard>

            {error && (

                <div

                    className="

                        mt-4

                        border

                        rounded

                        p-4

                        bg-red-50

                        text-red-700

                    "

                >

                    {error}

                </div>

            )}

            {report && (
                
                // Customer Infromation Block
                    
                    <div
                        className="
                            space-y-6
                        "
                    >
                    <SectionCard
                        title="Customer Information"
                    >
                        <div>
                            <strong>
                                Name:
                            </strong>
                            {" "}
                            {
                                report.customer.name
                            }
                        </div>

                        {
                            report.customer.contact_number &&
                            (
                                <div>
                                    <strong>
                                        Phone:
                                    </strong>
                                    {" "}
                                    {
                                        report.customer.contact_number
                                    }
                                </div>
                            )
                        }

                        {
                            report.customer.address &&
                            (
                                <div>
                                    <strong>
                                        Address:
                                    </strong>
                                    {" "}
                                    {
                                        report.customer.address
                                    }
                                </div>
                            )
                        }

                        {
                            report.customer.account_balance >= 0
                            ? (
                                <div>
                                    <strong>
                                        Outstanding Balance:
                                    </strong>
                                    {" "}
                                    ₹
                                    {
                                        report.customer.account_balance
                                            .toFixed(2)
                                    }
                                </div>
                            )
                            : (
                                <div
                                    className="
                                        text-green-700
                                        font-semibold
                                    "
                                >
                                    <strong>
                                        Advance Credit:
                                    </strong>
                                    {" "}
                                    ₹
                                    {
                                        Math.abs(
                                            report.customer.account_balance,
                                        ).toFixed(2)
                                    }
                                </div>
                            )
                        }

                    </SectionCard>

                    {/* Daily Milk Ledger */}

                    <SectionCard
                        title="Daily Milk Ledger"
                    >
                        <table
                            className="
                                border
                                border-black
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
                                {report.daily_ledger.map(
                                    (entry) => (
                                        <tr
                                            key={entry.day}
                                            className="
                                                border-b
                                            "
                                        >
                                            <td
                                                className="
                                                    p-2
                                                "
                                            >
                                                {entry.day}
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
                    </SectionCard>

                    {/* Milk Summary Block */}

                    <SectionCard
                        title="
                            Milk Summary
                        "
                    >

                        {
                            report.milk_summary
                                .cow_total > 0 &&
                            (
                                <div>
                                    Cow:
                                    {" "}
                                    {
                                        report
                                            .milk_summary
                                            .cow_total
                                    }
                                    {" "}L
                                    {" "}
                                    (
                                    ₹
                                    {
                                        report
                                            .milk_summary
                                            .cow_amount
                                    }
                                    )
                                </div>
                            )
                        }

                        {
                            report.milk_summary
                                .buffalo_total > 0 &&
                            (
                                <div>
                                    Buffalo:
                                    {" "}
                                    {
                                        report
                                            .milk_summary
                                            .buffalo_total
                                    }
                                    {" "}L
                                    {" "}
                                    (
                                    ₹
                                    {
                                        report
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
                                mt-2
                            "
                        >
                            Total Milk Amount:
                            {" "}
                            ₹
                            {
                                report
                                    .milk_summary
                                    .milk_amount
                            }
                        </div>

                    </SectionCard>
                    
                    {/* Extras report */}

                    {report.extras.length > 0 && (

                        <SectionCard
                            title="
                                Dairy Product
                            "
                        >

                            <div
                                className="
                                    space-y-6
                                "
                            >

                                {report.extras.map(
                                    (extra) => (

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

                                            <h3
                                                className="
                                                    text-lg
                                                    font-semibold
                                                    mb-3
                                                    border-b
                                                    border-black
                                                "
                                            >
                                                {
                                                    extra.product_name
                                                }
                                            </h3>

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
                                                            Quantity(in gms)
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
                                                                    ₹{
                                                                        (entry.quantity/1000) * extra.rate
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
                                                } grams
                                            </div>

                                            {/* <div>
                                                <strong>
                                                    Rate:
                                                </strong>
                                                {" "}
                                                ₹
                                                {
                                                    extra.rate
                                                }
                                                /
                                                {
                                                    extra.unit
                                                }
                                            </div> */}

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

                        </SectionCard>

                    )}

                    {/* Final Amounts */}

                    <SectionCard
                        title="
                            Billing Summary
                        "
                    >

                        <div
                            className="
                                space-y-2
                            "
                        >

                            {report.billing_summary
                                .milk_amount > 0 && (

                                <div
                                    className="
                                        flex
                                        justify-between
                                    "
                                >
                                    <span>
                                        Milk Total Amount
                                    </span>

                                    <span>
                                        ₹
                                        {
                                            report
                                                .billing_summary
                                                .milk_amount
                                                .toFixed(2)
                                        }
                                    </span>
                                </div>

                            )}

                            {report.billing_summary
                                .extras_amount > 0 && (

                                <div
                                    className="
                                        flex
                                        justify-between
                                    "
                                >
                                    <span>
                                        Total Dairy Product Amount
                                    </span>

                                    <span>
                                        ₹
                                        {
                                            report
                                                .billing_summary
                                                .extras_amount
                                                .toFixed(2)
                                        }
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
                                    Monthly Total
                                </span>

                                <span>
                                    ₹
                                    {
                                        (report
                                            .billing_summary
                                            .milk_amount
                                             + report.billing_summary.extras_amount).toFixed(2)
                                    }
                                </span>
                            </div>

                        </div>

                    </SectionCard>

                </div>

            )}

        </PageLayout>
    );
}