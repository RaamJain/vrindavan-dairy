import { useEffect } from "react";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";

import DetailedBillCard
    from "../components/DetailedBillCard";

import {
    getBillPreview,
} from "../api/billPreview";

import type {
    BillPreview,
} from "../types/billPreview";

import CustomerSearch
    from "../components/CustomerSearch";

import {
    generateBill,
} from "../api/billing";

import type {
    BillingResponse,
} from "../types/billing";


export default function BillingPage() {

    const [
        customerId,
        setCustomerId,
    ] = useState(0);

    const [
        customerName,
        setCustomerName,
    ] = useState("");

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
        billResult,
        setBillResult,
    ] = useState<
        BillingResponse
        | null
    >(null);

    const [

        detailedBill,
    
        setDetailedBill,
    
    ] = useState<
    
        BillPreview
    
        | null
    
    >(null);
    
    const [
    
        showDetailedBill,
    
        setShowDetailedBill,
    
    ] = useState(false);

    const [
        successMessage,
        setSuccessMessage,
    ] = useState("");

    const [
        showConfirmModal,
        setShowConfirmModal,
    ] = useState(false);

    useEffect(() => {

        if (!successMessage) {
            return;
        }

        const timer = setTimeout(
            () => {
                setSuccessMessage("");
            },
            5000,
        );

        return () =>
            clearTimeout(timer);

    }, [successMessage]);


    async function handleDetailedBill() {

        if (
            !customerId
        ) {
            return;
        }

        try {

            const result =
                await getBillPreview(
                    customerId,
                    month,
                    year,
                );
            if ("message" in result) {

                setSuccessMessage(result.message);
            
                return;
            
            }
            setDetailedBill(
                result,
            );

            setShowDetailedBill(
                (
                    previous,
                ) => !previous,
            );

        } catch (error) {

            console.error(
                error,
            );
        }
    }


    async function
    handleGenerateBill() {

        if (!customerId) {
            return;
        }

        try {

            const result =
                await generateBill(
                    customerId,
                    month,
                    year,
                );

            setBillResult(
                result,
            );

            setSuccessMessage(
                result.message,
            );

        } catch (error) {

            console.error(
                error,
            );
        }
    }

    return (

        <PageLayout
            title="Bill Preview"
            description="Generate monthly bills and review billing summaries."
        >

            {successMessage && (

                <div
                    className="
                        bg-green-100
                        border
                        border-green-300
                        text-green-800
                        rounded
                        p-3
                    "
                >
                    ✓ {successMessage}
                </div>

            )}

            <SectionCard
                title="Generate Bill"
            >
                <div className="space-y-4">

                    <CustomerSearch
                        value={
                            customerName
                        }
                        onChange={
                            setCustomerName
                        }
                        onSelect={(
                            customer,
                        ) => {

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
                            w-full
                            border
                            rounded
                            p-4
                        "
                    />

                    <button
                        type="button"
                        onClick={() => {

                            if (
                                !customerId
                            ) {
                                return;
                            }

                            setShowConfirmModal(
                                true,
                            );
                        }}
                        className="
                            bg-green-700
                            text-white
                            px-4
                            py-2
                            rounded
                        "
                    >
                        Generate Bill
                    </button>

                </div>


            </SectionCard>

            {billResult && (

                <SectionCard
                    title="Bill Summary"
                >

                    <div>
                        Customer:
                        {" "}
                        {
                            billResult.customer
                        }
                    </div>

                    <div>
                        Month:
                        {" "}
                        {
                            billResult.month
                        }
                        /
                        {
                            billResult.year
                        }
                    </div>

                    <div>
                        Milk Amount:
                        {" "}
                        ₹
                        {
                            billResult.milk_amount
                        }
                    </div>

                    <div>
                        Extras Amount:
                        {" "}
                        ₹
                        {
                            billResult.extras_amount
                        }
                    </div>

                    <div>
                        Monthly Amount:
                        {" "}
                        ₹
                        {
                            billResult.bill_amount
                        }
                    </div>
                    
                    {billResult.previous_dues > 0 && (

                        <div
                            className="
                                text-red-700
                                font-semibold
                            "
                        >
                            Previous Balance:
                            {" "}
                            ₹
                            {
                                billResult.previous_dues.toFixed()
                            }
                        </div>

                        )}
                        {billResult.previous_dues < 0 && (

                        <div
                            className="
                                text-green-700
                                font-semibold
                            "
                        >
                            Previous Balance:
                            {" "}
                            ₹
                            {
                                billResult.previous_dues.toFixed()
                            }
                        </div>

                        )}
                        {billResult.previous_dues === 0 && (

                        <div
                            className="
                                text-black
                                font-semibold
                            "
                        >
                            Previous Balance:
                            {" "}
                            ₹
                            {
                                billResult.previous_dues.toFixed(2)
                            }
                        </div>

                        )}

                    <div>
                        Payments Received:
                        {" "}
                        ₹
                        {
                            billResult.payments_received
                        }
                    </div>
                

                    <div
                        className="
                            font-semibold
                        "
                    >
                        Net Amount:
                        {" "}
                        ₹
                        {
                            billResult.current_dues
                        }
                    </div>

                    {billResult.account_balance > 0 && (

                        <div
                            className="
                                text-red-700
                                font-semibold
                            "
                        >
                            New Balance:
                            {" "}
                            ₹
                            {
                                billResult.account_balance
                            }
                        </div>

                    )}

                    {billResult.account_balance < 0 && (

                        <div
                            className="
                                text-green-700
                                font-semibold
                            "
                        >
                            New Credit:
                            {" "}
                            ₹
                            {
                                Math.abs(
                                    billResult.account_balance,
                                )
                            }
                        </div>

                    )}

                    {billResult.account_balance === 0 && (

                        <div
                            className="
                                font-semibold
                            "
                        >
                            Account Settled
                        </div>

                    )}

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
                </SectionCard>



            )}
            <SectionCard title="View Detailed Bill"
            >

                {
                    showDetailedBill
                    && detailedBill && (

                        <DetailedBillCard
                            bill={
                                detailedBill
                            }
                        />

                    )
                }

                <button
                    type="button"
                    onClick={
                        handleDetailedBill
                    }
                    className="
                        mt-4
                        bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded
                    "
                >
                    {
                        showDetailedBill
                            ? "Hide Detailed Bill"
                            : "View Detailed Bill"
                    }
                </button>
            </SectionCard>


            {showConfirmModal && (

                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >

                    <div
                        className="
                            bg-white
                            rounded
                            p-6
                            w-full
                            max-w-md
                        "
                    >

                        <h2
                            className="
                                text-xl
                                font-bold
                                mb-4
                            "
                        >
                            Generate Bill
                        </h2>

                        <div
                            className="
                                space-y-2
                            "
                        >

                            <div>
                                Customer:
                                {" "}
                                {
                                    customerName
                                }
                            </div>

                            <div>
                                Month:
                                {" "}
                                {month}
                            </div>

                            <div>
                                Year:
                                {" "}
                                {year}
                            </div>

                        </div>

                        <div
                            className="
                                flex
                                justify-end
                                gap-2
                                mt-6
                            "
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmModal(
                                        false,
                                    )
                                }
                                className="
                                    border
                                    rounded
                                    px-4
                                    py-2
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={async () => {

                                    await handleGenerateBill();

                                    setShowConfirmModal(
                                        false,
                                    );
                                }}
                                className="
                                    bg-green-700
                                    text-white
                                    rounded
                                    px-4
                                    py-2
                                "
                            >
                                Confirm
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </PageLayout>
    );
}