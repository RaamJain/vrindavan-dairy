import { useEffect } from "react";
import { useState } from "react";

import CustomerSearch
    from "../components/CustomerSearch";

import {
    getCustomerPaymentSummary,
    getPaymentHistory,
    recordPayment,
} from "../api/payments";

import type {
    CustomerPaymentSummary,
    PaymentHistoryItem,
} from "../types/payment";

import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";

export default function PaymentsPage() {

    const [
        customerId,
        setCustomerId,
    ] = useState(0);

    const [
        customerName,
        setCustomerName,
    ] = useState("");

    const [
        summary,
        setSummary,
    ] = useState<
        CustomerPaymentSummary
        | null
    >(null);

    const [
        paymentAmount,
        setPaymentAmount,
    ] = useState("");

    const [
        paymentMode,
        setPaymentMode,
    ] = useState("Cash");

    const [
        notes,
        setNotes,
    ] = useState("");

    const [
        successMessage,
        setSuccessMessage,
    ] = useState("");

    const [
        showConfirmModal,
        setShowConfirmModal,
    ] = useState(false);

    const [
        showHistory,
        setShowHistory,
    ] = useState(false);
    
    const [
        paymentHistory,
        setPaymentHistory,
    ] = useState<PaymentHistoryItem[]>([]);


    useEffect(() => {

        if (!showHistory) {
            return;
        }
    
        const timer = setTimeout(
            () => {
    
                setShowHistory(
                    false,
                );
    
            },
            20000,
        );
    
        return () =>
            clearTimeout(timer);
    
    }, [showHistory]);


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

    async function loadCustomerSummary(
        id: number,
    ) {

        try {

            const data =
                await getCustomerPaymentSummary(
                    id,
                );

            setSummary(
                data,
            );

        } catch (error) {

            console.error(
                error,
            );
        }
    }


    async function togglePaymentHistory() {

        if (
            !showHistory
            && customerId
        ) {

            const history =
                await getPaymentHistory(
                    customerId,
                );

            setPaymentHistory(
                history,
            );
        }

        setShowHistory(
            !showHistory,
        );
    }
    async function handleRecordPayment() {

        if (
            !customerId
            || !paymentAmount
        ) {
            return;
        }

        try {

            await recordPayment(
                {
                    customer_id:
                        customerId,

                    payment_amount:
                        Number(
                            paymentAmount,
                        ),

                    mode:
                        paymentMode,

                    notes,
                },
            );

            const updatedSummary =
                await getCustomerPaymentSummary(
                    customerId,
                );

            setSummary(
                updatedSummary,
            );

            setPaymentAmount(
                "",
            );

            setNotes(
                "",
            );

            setSuccessMessage(
                "Payment recorded successfully",
            );

        } catch (error) {

            console.error(
                error,
            );
        }
    }

    return (

        <PageLayout
            title="Payments"
            description="Payment tracker and entry."
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
                title="
                    Customer Search
                "
            >

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

                        loadCustomerSummary(
                            customer.id,
                        );
                    }}
                />

            </SectionCard>

            {summary && (

                <SectionCard
                    title="
                        Customer Information
                    "
                >
                    <div className="space-y-4">

                    <div>
                        Name:
                        {" "}
                        {
                            summary.customer_name
                        }
                    </div>

                    <div
                        className={
                            summary.account_balance >= 0
                                ? "text-red-700 font-semibold"
                                : "text-green-700 font-semibold"
                        }
                    >

                        {
                            summary.account_balance >= 0
                                ? "Amount Due"
                                : "Advance Balance"
                        }

                        :
                        {" "}

                        ₹

                        {
                            Math.abs(
                                summary.account_balance,
                            )
                        }

                    </div>

                    {summary.latest_payment && (

                        <div
                            className="
                                border-t
                                pt-4
                                space-y-2
                            "
                        >

                            <h3
                                className="
                                    font-semibold
                                "
                            >
                                Latest Payment
                            </h3>

                            <div>
                                Amount:
                                {" "}
                                ₹
                                {
                                    summary
                                        .latest_payment
                                        .payment_amount
                                }
                            </div>

                            <div>
                                Mode:
                                {" "}
                                {
                                    summary
                                        .latest_payment
                                        .mode
                                }
                            </div>

                            <div>
                                Date:
                                {" "}
                                {
                                    summary
                                        .latest_payment
                                        .date
                                }
                            </div>

                            <div>
                                Notes:
                                {" "}
                                {
                                    summary
                                        .latest_payment
                                        .notes
                                }
                            </div>

                        </div>

                    )}

                    <button

                        type="button"

                        onClick={

                            togglePaymentHistory

                        }

                        className="

                            text-blue-600

                            font-medium

                        "

                    >

                        {

                            showHistory

                                ? "▲ Payment History"

                                : "▼ Payment History"

                        }

                    </button>
                    {
                        showHistory && (

                            <div
                                className="
                                    mt-3
                                    overflow-x-auto
                                "
                            >

                                <table
                                    className="
                                        w-full
                                        border
                                    "
                                >

                                    <thead>

                                        <tr
                                            className="
                                                bg-gray-100
                                            "
                                        >

                                            <th className="border p-2">
                                                Date
                                            </th>

                                            <th className="border p-2">
                                                Amount
                                            </th>

                                            <th className="border p-2">
                                                Mode
                                            </th>

                                            <th className="border p-2">
                                                Balance Before
                                            </th>

                                            <th className="border p-2">
                                                Balance After
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {paymentHistory.map(
                                            (
                                                payment,
                                                index,
                                            ) => (

                                                <tr
                                                    key={
                                                        index
                                                    }
                                                >

                                                    <td className="border p-2">
                                                        {
                                                            payment.date
                                                        }
                                                    </td>

                                                    <td className="border p-2">
                                                        ₹
                                                        {
                                                            payment.payment_amount
                                                        }
                                                    </td>

                                                    <td className="border p-2">
                                                        {
                                                            payment.mode
                                                        }
                                                    </td>

                                                    <td className="border p-2">
                                                        ₹
                                                        {
                                                            payment.balance_before
                                                        }
                                                    </td>

                                                    <td className="border p-2">
                                                        ₹
                                                        {
                                                            payment.balance_after
                                                        }
                                                    </td>

                                                </tr>

                                            ),
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )
                    }
                    <div
                        className="
                            border-t
                            pt-4
                            space-y-3
                        "
                    >

                        <h3
                            className="
                                font-semibold
                            "
                        >
                            Record Payment
                        </h3>

                        <input
                            type="number"
                            min="0"
                            value={
                                paymentAmount
                            }
                            onChange={(e) =>
                                setPaymentAmount(
                                    e.target.value,
                                )
                            }
                            placeholder="Amount"
                            className="
                                w-full
                                border
                                rounded
                                p-2
                            "
                        />

                        <select
                            value={
                                paymentMode
                            }
                            onChange={(e) =>
                                setPaymentMode(
                                    e.target.value,
                                )
                            }
                            className="
                                w-full
                                border
                                rounded
                                p-2
                            "
                        >

                            <option>
                                Cash
                            </option>

                            <option>
                                UPI
                            </option>

                            <option>
                                Bank Transfer
                            </option>

                            <option>
                                Cheque
                            </option>

                        </select>

                        <input
                            value={notes}
                            onChange={(e) =>
                                setNotes(
                                    e.target.value,
                                )
                            }
                            placeholder="Notes"
                            className="
                                w-full
                                border
                                rounded
                                p-2
                            "
                        />

                        <button
                            type="button"
                            onClick={() => {
                                if (
                                    !customerId
                                    || !paymentAmount
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
                            Record Payment
                        </button>

                    </div>
                    </div>

                </SectionCard>

            )}

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
                            Record Payment
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
                                    summary?.customer_name
                                }
                            </div>

                            <div>
                                Amount:
                                {" "}
                                ₹
                                {
                                    paymentAmount
                                }
                            </div>

                            <div>
                                Mode:
                                {" "}
                                {
                                    paymentMode
                                }
                            </div>

                            {notes && (
                                <div>
                                    Notes:
                                    {" "}
                                    {notes}
                                </div>
                            )}

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
                                    await handleRecordPayment();
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