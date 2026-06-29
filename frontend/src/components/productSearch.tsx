import { useState } from "react";

import type { Product } from "../types/product";

import { searchProducts } from "../api/products";

interface ProductSearchProps {
    value: string;

    onChange: (
        value: string,
    ) => void;

    onSelect: (
        product: Product,
    ) => void;
}

export default function ProductSearch({
    value,
    onChange,
    onSelect,
}: ProductSearchProps) {
    const [products, setProducts] =
        useState<Product[]>([]);

    return (
        <div className="relative">
            <input
                className="w-full border rounded p-2"
                placeholder="Search Product"
                value={value}
                onChange={async (e) => {
                    const query =
                        e.target.value;

                    onChange(query);

                    if (
                        !query.trim()
                    ) {
                        setProducts([]);
                        return;
                    }

                    const results =
                        await searchProducts(
                            query,
                        );

                    setProducts(
                        results,
                    );
                }}
            />

            {products.length > 0 && (
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
                    {products.map(
                        (
                            product,
                        ) => (
                            <div
                                key={
                                    product.id
                                }
                                className="
                                    p-2
                                    cursor-pointer
                                    hover:bg-gray-100
                                "
                                onClick={() => {
                                    onChange(
                                        product.name,
                                    );

                                    onSelect(
                                        product,
                                    );

                                    setProducts(
                                        [],
                                    );
                                }}
                            >
                                <div>
                                    {
                                        product.name
                                    }
                                </div>

                                <div
                                    className="
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    ₹
                                    {
                                        product.rate
                                    }
                                    /
                                    {
                                        product.unit
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