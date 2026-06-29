import { useState } from "react";

import type {
    Customer,
} from "../types/customer";

import {
    searchCustomers,
    searchInactiveCustomers,
} from "../api/customers";

interface CustomerSearchProps {
    value: string;

    onChange: (
        value: string,
    ) => void;

    onSelect: (
        customer: Customer,
    ) => void;

    searchInactive?: boolean;
}

export default function CustomerSearch({
    value,
    onChange,
    onSelect,
    searchInactive = false,
}: CustomerSearchProps) {

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
                className="
                    w-full
                    border
                    rounded
                    p-2
                "
                placeholder="Search Customer"
                value={value}
                onChange={async (e) => {

                    const query =
                        e.target.value;

                    onChange(
                        query,
                    );

                    if (
                        !query.trim()
                    ) {

                        setCustomers(
                            [],
                        );

                        return;
                    }

                    const results =
                        searchInactive
                            ? await searchInactiveCustomers(
                                  query,
                              )
                            : await searchCustomers(
                                  query,
                              );

                    setCustomers(
                        results,
                    );

                }}
            />

            {customers.length > 0 && (

                <div
                    className="
                        absolute
                        z-10
                        w-full
                        border
                        rounded
                        mt-1
                        bg-white
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

                                    onChange(
                                        customer.name,
                                    );

                                    onSelect(
                                        customer,
                                    );

                                    setCustomers(
                                        [],
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

                                <div
                                    className="
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    {
                                        customer.address
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