import { useState } from "react";

import CustomerSearch from "../components/CustomerSearch";
import NewBillCard from "../components/NewBillCard";

import {
    getBillPreview,
} from "../api/billPreview";

import type {
    Customer,
} from "../types/customer";

import type {
    BillPreview,
} from "../types/billPreview";
import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";

export default function SingleBillPrintPage() {

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
        customerSearch,
        setCustomerSearch,
    ] = useState("");

    const [
        selectedCustomer,
        setSelectedCustomer,
    ] = useState<Customer | null>(
        null,
    );

    const [
        bill,
        setBill,
    ] = useState<
        BillPreview | null
    >(null);

    const [
        message,
        setMessage,
    ] = useState("");


    async function loadBill() {

        if (
            !selectedCustomer
        ) {
            return;
        }
    
        setBill(null);
        setMessage("");
    
        const result =
            await getBillPreview(
                selectedCustomer.id,
                month,
                year,
            );
    
        if (
            "message" in result
        ) {
    
            setMessage(
                result.message,
            );
    
            return;
        }
    
        setBill(
            result,
        );
    }

    return (

        <PageLayout
            title="Single Bill Printing"
            description="Print a single customer bill"
        >

            <SectionCard
                title="Customer Search"
            >
                <div className="space-y-4">

                    <CustomerSearch
                        value={
                            customerSearch
                        }
                        onChange={(
                            value,
                        ) => {

                            setCustomerSearch(
                                value,
                            );

                            setBill(
                                null,
                            );
                        }}
                        onSelect={(
                            customer,
                        ) => {

                            setSelectedCustomer(
                                customer,
                            );

                            setBill(
                                null,
                            );
                        }}
                    />

                    {selectedCustomer && (

                        <div
                            className="
                                text-sm
                                text-gray-600
                            "
                        >
                            Selected:
                            {" "}
                            {
                                selectedCustomer.name
                            }
                        </div>

                    )}

                    <div
                        className="
                            flex
                            gap-4
                            items-center
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
                                (
                                    _,
                                    i,
                                ) => (

                                    <option
                                        key={
                                            i + 1
                                        }
                                        value={
                                            i + 1
                                        }
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
                                loadBill
                            }
                            disabled={
                                !selectedCustomer
                            }
                            className="
                                bg-green-700
                                text-white
                                px-4
                                py-2
                                rounded
                                disabled:opacity-50
                            "
                        >
                            Load Bill
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                window.print()
                            }
                            disabled={
                                !bill
                            }
                            className="
                                bg-blue-700
                                text-white
                                px-4
                                py-2
                                rounded
                                disabled:opacity-50
                            "
                        >
                            Print Bill
                        </button>
                        {message && (

                            <div

                                className="

                                    border

                                    border-yellow-300

                                    bg-yellow-50

                                    text-yellow-800

                                    rounded

                                    p-3

                                "

                            >

                                {message}

                            </div>

                        )}

                    </div>
                </div>

            </SectionCard>

            {bill && (

                <div
                    className="
                        print-container
                    "
                >

                    <div
                        className="
                            print-page
                            grid
                            grid-cols-3
                            gap-2
                        "
                    >

                        <div />

                        <NewBillCard
                            bill={bill}
                        />

                        <div />

                    </div>

                </div>

            )}

        </PageLayout>

    );
}