import { useState } from "react";

import {
    getBulkBillPreview,
} from "../api/billBulk";

import type {
    BillPreview,
} from "../types/billPreview";

import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";
import NewBillCard from "../components/NewBillCard";

export default function BulkBillPrintPage() {

    const [
        month,
        setMonth,
    ] = useState(
        new Date().getMonth() + 1,
    );

    const [
        year,
        setYear,
    ] = useState(
        new Date().getFullYear(),
    );

    const [
        bills,
        setBills,
    ] = useState<
        BillPreview[]
    >([]);

    async function loadBills() {

        const result =
            await getBulkBillPreview(
                month,
                year,
            );

        setBills(
            result,
        );
    }

    return (

        <PageLayout
            title="Bulk Bill Printing"
            description="Load and print monthly bills for all customers."
        >

            <SectionCard
                title="Select Period"
            >
                <div

                    className="
                        flex
                        gap-4
                        items-center
                        flex-wrap
                    "
                >
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
                        border
                        rounded
                        p-2
                    "
                >

                    {Array.from(
                        {
                            length: 12,
                        },
                        (_, i) => (

                            <option
                                key={i + 1}
                                value={i + 1}
                            >
                                {i + 1}
                            </option>

                        ),
                    )}

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
                        border
                        rounded
                        p-2
                    "
                />

                <button
                    type="button"
                    onClick={
                        loadBills
                    }
                    className="
                        bg-green-700
                        text-white
                        px-4
                        py-2
                        rounded
                        border
                    "
                >
                    Load Bills
                </button>

                <button
                    type="button"
                    onClick={() =>
                        window.print()
                    }
                    className="
                        bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded
                        border
                    "
                >
                    Print Bills
                </button>
                </div>

            </SectionCard>

            <div
                className="
                    print-container
                    space-y-4
                "
            >

                {Array.from(
                    {
                        length:
                            Math.ceil(
                                bills.length / 3,
                            ),
                    },
                    (
                        _,
                        pageIndex,
                    ) => {

                        const pageBills =
                            bills.slice(
                                pageIndex * 3,
                                pageIndex * 3 + 3,
                            );

                        return (

                            <div
                                key={
                                    pageIndex
                                }
                                className="
                                    print-page
                                    grid
                                    grid-cols-3
                                    gap-2
                                "
                            >

                                {pageBills.map(
                                    (
                                        bill,
                                    ) => (

                                        <NewBillCard
                                            key={
                                                bill.customer.id
                                            }
                                            bill={
                                                bill
                                            }
                                        />

                                    ),
                                )}

                            </div>

                        );
                    },
                )}

            </div>

        </PageLayout>

    );
}