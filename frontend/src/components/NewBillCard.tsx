import QRCode from "react-qr-code";

import type {
    BillPreview,
} from "../types/billPreview";

interface Props {
    bill: BillPreview;
}

export default function NewBillCard(
    {
        bill,
    }: Props,
) {

    const qrValue =
        "upi://pay?pa=9893027459.eazypay@icici&pn=Vrindavan Dairy";

    const monthName =
        new Date(
            bill.year,
            bill.month - 1,
        )
            .toLocaleString(
                "en-IN",
                {
                    month: "long",
                },
            )
            .toUpperCase();

    const billTitle =
        `BILL OF SUPPLY IN ${monthName}'${String(
            bill.year,
        ).slice(-2)}`;

    const dueColor =

        bill.previous_dues > 0
    
            ? "text-red-700"
    
            : bill.previous_dues < 0
    
            ? "text-green-700"
    
            : "text-black";

        function getDayData(
            day: number,
        ) {
        
            return (
                bill.daily_ledger.find(
                    (
                        entry,
                    ) =>
                        entry.day === day,
                ) ?? null
            );
        }
        
        function isEmptyDay(
            day: number,
        ) {
        
            return !bill.daily_ledger.some(
                (
                    entry,
                ) =>
                    entry.day === day,
            );
        }

    return (

        <div
            className="
                border
                border-black
                bg-white
                text-[10px]
                w-full
            "
        >

            {/* Header */}

            <div
                className="
                    pt-1
                    px-2
                    grid
                    grid-cols-2
                    items-center
                    gap-2
                    border-b
                "
            >

                {/* Left */}

                <div
                    className="
                        px-2
                        pb-1
                    "
                >

                    <div
                        className="
                            font-semibold
                            text-[9px]
                        "
                    >
                        Name: {bill.customer.name}
                    </div>

                    <div
                        className="
                            text-[7px]
                            mt-1
                            font-semibold
                        "
                    >
                        Number: {bill.customer.contact_number}
                    </div>

                </div>

                {/* Right */}

                <div
                    className="
                        text-center
                        font-bold
                        text-[10px]
                    "
                >
                    {billTitle}
                </div>

                

            </div>

            {/* Daily Ledger */}

            <div
                className="
                    p-1
                    border-b
                    border-black
                "
            >

                <div
                    className="
                        grid
                        grid-cols-2
                        gap-1
                    "
                >

                    {[
                        [1, 15],
                        [16, 31],
                    ].map(
                        (
                            [start, end],
                        ) => (

                            <table
                                key={start}
                                className="
                                    w-full
                                    border-collapse
                                    text-[10px]
                                "
                            >

                                <thead>

                                    <tr>

                                        <th
                                            className="
                                                border
                                                bg-lime-100
                                            "
                                        >
                                            DATE
                                        </th>

                                        <th className="border">
                                            MC
                                        </th>

                                        <th className="border">
                                            MB
                                        </th>

                                        <th className="border">
                                            EC
                                        </th>

                                        <th className="border">
                                            EB
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {Array.from(
                                        {
                                            length:
                                                end -
                                                start +
                                                1,
                                        },
                                        (
                                            _,
                                            index,
                                        ) =>
                                            start +
                                            index,
                                    ).map(
                                        (
                                            day,
                                        ) => {

                                            const data =
                                                getDayData(
                                                    day,
                                                );

                                            const empty =
                                                isEmptyDay(
                                                    day,
                                                );

                                            return (

                                                <tr
                                                    key={day}
                                                >

                                                    <td
                                                        className="
                                                            border
                                                            text-center
                                                            bg-lime-50
                                                        "
                                                    >
                                                        {day}
                                                    </td>

                                                    {[
                                                        data?.morning_cow,
                                                        data?.morning_buffalo,
                                                        data?.evening_cow,
                                                        data?.evening_buffalo,
                                                    ].map(
                                                        (
                                                            value,
                                                            index,
                                                        ) => (

                                                            <td
                                                                key={
                                                                    index
                                                                }
                                                                className={`
                                                                    border
                                                                    text-center
                                                                    ${
                                                                        empty || value === 0
                                                                            ? "bg-gray-300"
                                                                            : ""
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    value === 0
                                                                        ? ""
                                                                        : value ?? ""
                                                                }
                                                            </td>

                                                        ),
                                                    )}

                                                </tr>

                                            );
                                        },
                                    )}

                                </tbody>

                            </table>

                        ),
                    )}

                </div>

                <div
                    className="
                        mt-1
                        border
                        text-center
                        text-[8px]
                        py-1
                        px-1
                        bg-lime-50
                    "
                >
                    MC = गाय (सुबह) &nbsp; • &nbsp;
                    MB = भैंस (सुबह) &nbsp; • &nbsp;
                    EC = गाय (शाम) &nbsp; • &nbsp;
                    EB = भैंस (शाम)
                </div>

            </div>

            {/* Summary Section */}

            <div
                className="
                    grid
                    grid-cols-2
                    border-b
                    border-black
                "
            >

                {/* Milk Summary */}

                <div
                    className="
                        border-r
                    "
                >

                    <div
                        className="
                            text-center
                            font-semibold
                            text-[8px]
                            // border-b
                            py-1
                        "
                    >
                        MILK SUMMARY
                    </div>

                    <table
                        className="
                            w-full
                            // border-collapse
                            text-[7px]
                        "
                    >

                        <thead>

                            <tr>

                                <th className="border p-1">
                                    Type
                                </th>

                                <th className="border p-1">
                                    Qty.
                                </th>

                                <th className="border p-1">
                                    Amount
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td className="border-t border-r border-b p-1">
                                    Cow
                                </td>

                                <td className="text-center">
                                    {bill.milk_summary.cow_total}
                                </td>

                                <td className="border text-right pr-1">
                                    ₹{bill.milk_summary.cow_amount}
                                </td>

                            </tr>

                            <tr>

                                <td className=" p-1">
                                    Buffalo
                                </td>

                                <td className="border text-center">
                                    {bill.milk_summary.buffalo_total}
                                </td>

                                <td className="border text-right pr-1">
                                    ₹{bill.milk_summary.buffalo_amount}
                                </td>

                            </tr>

                            <tr
                                className="
                                    font-semibold
                                    bg-gray-50
                                "
                            >

                                <td className="border p-1">
                                    Total
                                </td>

                                <td className="border text-center">
                                    {
                                        bill.milk_summary.cow_total +
                                        bill.milk_summary.buffalo_total
                                    }
                                </td>

                                <td className="border text-right pr-1">
                                    ₹{bill.milk_summary.milk_amount}
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                {/* Extra Items */}

                <div>

                    <div
                        className="
                            text-center
                            font-semibold
                            text-[8px]
                            border-b
                            border-black
                            py-1
                        "
                    >
                        Dairy Products
                    </div>

                    <table
                        className="
                            w-full
                            border-collapse
                            text-[7px]
                        "
                    >

                        <thead>

                            <tr>

                                <th className="border p-1">
                                    Item
                                </th>

                                <th className="border p-1">
                                    Qty.
                                </th>

                                <th className="border p-1">
                                    Amount
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {bill.extras.map(
                                (
                                    item,
                                ) => (

                                    <tr
                                        key={
                                            item.product_name
                                        }
                                    >

                                        <td className="border p-1">
                                            {item.product_name}
                                        </td>

                                        <td className="border text-center">
                                            {item.total_quantity}
                                        </td>

                                        <td className="border text-right pr-1">
                                            ₹{item.amount}
                                        </td>

                                    </tr>

                                ),
                            )}

                            <tr
                                className="
                                    font-semibold
                                    bg-gray-50
                                "
                            >

                                <td
                                    colSpan={2}
                                    className="
                                        border
                                        p-1
                                    "
                                >
                                    TOTAL Amount
                                </td>

                                <td
                                    className="
                                        border
                                        text-right
                                        pr-1
                                    "
                                >
                                    ₹
                                    {
                                        bill.extras.reduce(
                                            (
                                                total,
                                                item,
                                            ) =>
                                                total +
                                                item.amount,
                                            0,
                                        )
                                    }
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Monthly Amount */}

            <div
                className="
                    grid
                    grid-cols-[1fr_auto]
                    border-b
                    border-black
                    bg-blue-100
                    text-[8px]
                "
            >

                <div
                    className="
                        px-2
                        py-1
                    "
                >
                    CURRENT BILL AMOUNT
                </div>

                <div
                    className="
                        px-2
                        py-1
                        border-l
                        border-black
                    "
                >
                    ₹{bill.monthly_total.toFixed(2)}
                </div>

            </div>


            {/* Account Balance */}

            <div
                className="
                    grid
                    grid-cols-[1fr_auto]
                    border-b
                    border-black
                    bg-blue-100
                    text-[8px]
                "
            >

                <div
                    className={`${dueColor} px-2 py-1`}
                >
                    PREVIOUS BALANCE
                </div>

                <div
                    className={`${dueColor} px-2 py-1 border-l border-black`}
                >
                    ₹{
                        bill.previous_dues.toFixed(2)}
                </div>

            </div>

            {/* Latest Payment */}

            <div
                className="
                    grid
                    grid-cols-3
                    border-b
                    border-black
                    bg-blue-100
                    text-[8px]
                "
            >

                <div
                    className="
                        px-2
                        py-1
                        col-span-2
                    "
                >
                    PREVIOUS AMOUNT RECEIVED
                </div>

                <div
                    className="
                        px-2
                        py-1
                        border-l
                        border-black
                    "
                >
                    ₹{
                        bill.payments_received?.toFixed(
                            2,
                        ) ?? "0.00"
                    }
                </div>

            </div>

            {/* Final Payable */}

            <div
                className="
                    grid
                    grid-cols-[1fr_auto]
                    border-b
                    border-black
                    bg-yellow-100
                    text-[9px]
                    font-bold
                "
            >

                <div
                    className="
                        px-2
                        py-2
                    "
                >
                    NET PAYABLE AMOUNT
                </div>

                <div
                    className="
                        px-2
                        py-2
                        border-l
                        border-black
                    "
                >
                    ₹{Math.abs(
                        bill.account_balance,
                    ).toFixed(2)}
                </div>

            </div>

            {/* Footer */}

            <div
                className="
                    grid
                    grid-cols-3
                    text-[9px]
                    min-h-[48px]
                    border
                "
            >

                {/* Online Payment */}

                <div
                    className="
                        flex
                        flex-col
                        col-span-2
                        justify-center
                        items-center
                        border-r
                        border-black
                        px-1
                        text-center
                        font-semibold
                    "
                >
                    <ul className="pt-1 list-disc pl-3">

                        <li>कृपया ऑनलाइन भुगतान को प्राथमिकता दें।</li>

                        <li>नगद भुगतान की रसीद अवश्य लें।</li>

                        <li>भूल-चूक, लेनी-देनी </li>

                        <li>संपर्क करें: 9893027459, 9300472881</li>

                    </ul>

                </div>

                {/* Contact */}

                <div
                    className="
                        flex
                        flex-col
                        justify-center
                        items-center
                        px-1
                        text-center
                        text-[9px]
                        font-semibold 
                        pt-1
                    "
                >

                    <QRCode
                        value={qrValue}
                        size={50}
                    />

                    <div
                        className="
                            text-[5px]
                            text-center
                            leading-tight
                            mt-[2px]
                        "
                    >
                        Folklure Dairy and Agro Products
                    </div>

                </div>

            </div>
        </div>

    );
}