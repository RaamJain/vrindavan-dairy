import { useState } from "react";

import {
    searchAllCustomers,
    searchCustomers,
    searchInactiveCustomers,
} from "../api/customers";

import type {
    Customer,
} from "../types/customer";

interface CustomerManagementSearchProps {
    onSelect: (
        customer: Customer,
    ) => void;

    searchMode?: "all" | "active" | "inactive";
}

export default function CustomerManagementSearch({
    onSelect,
    searchMode = "all",
}: CustomerManagementSearchProps) {

    const [
        query,
        setQuery,
    ] = useState("");

    const [
        customers,
        setCustomers,
    ] = useState<Customer[]>(
        [],
    );

    return (

        <div
            className="
                relative
            "
        >

            <input
                value={query}
                onChange={async (
                    e,
                ) => {

                    const value =
                        e.target.value;

                    setQuery(
                        value,
                    );

                    if (
                        !value.trim()
                    ) {

                        setCustomers(
                            [],
                        );

                        return;

                    }

                    let results: Customer[] =
                        [];

                    if (
                        searchMode ===
                        "all"
                    ) {

                        results =
                            await searchAllCustomers(
                                value,
                            );

                    }

                    if (
                        searchMode ===
                        "active"
                    ) {

                        results =
                            await searchCustomers(
                                value,
                            );

                    }

                    if (
                        searchMode ===
                        "inactive"
                    ) {

                        results =
                            await searchInactiveCustomers(
                                value,
                            );

                    }

                    setCustomers(
                        results,
                    );

                }}
                placeholder="Search Customer"
                className="
                    w-full
                    border
                    rounded
                    p-2
                "
            />

            {customers.length >
                0 && (

                <div
                    className="
                        absolute
                        z-10
                        w-full
                        bg-white
                        border
                        rounded
                        mt-1
                        shadow
                    "
                >

                    {customers.map(
                        (
                            customer,
                        ) => (

                            <div
                                key={
                                    customer.id
                                }
                                className="
                                    p-2
                                    cursor-pointer
                                    hover:bg-gray-100
                                "
                                onClick={() => {

                                    setQuery(
                                        customer.name,
                                    );

                                    setCustomers(
                                        [],
                                    );

                                    onSelect(
                                        customer,
                                    );

                                }}
                            >

                                <div>
                                    {
                                        customer.name
                                    }
                                </div>

                                <div
                                    className="
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    {
                                        customer.contact_number
                                    }
                                </div>

                            </div>

                        ),
                    )}

                </div>

            )}

        </div>

    );

}