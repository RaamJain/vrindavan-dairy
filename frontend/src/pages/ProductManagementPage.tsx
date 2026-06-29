import { useEffect } from "react";
import { useState } from "react";

import {
    createProduct,
    updateProductRate,
} from "../api/products";

import ProductSearch
    from "../components/productSearch";

import type {
    Product,
} from "../types/product";
import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";


const units = [
    "Kg",
    "Grams",
    "Litres",
];

export default function ProductManagementPage() {

    const [
        name,
        setName,
    ] = useState("");

    const [
        unit,
        setUnit,
    ] = useState("Kg");

    const [
        rate,
        setRate,
    ] = useState(0);

    const [
        selectedProduct,
        setSelectedProduct,
    ] = useState<Product | null>(
        null,
    );

    const [
        searchValue,
        setSearchValue,
    ] = useState("");

    const [
        newRate,
        setNewRate,
    ] = useState(0);

    const [
        modalType,
        setModalType,
    ] = useState<
        "create"
        | "update-rate"
        | null
    >(null);

    const [
        successMessage,
        setSuccessMessage,
    ] = useState("");

    useEffect(() => {

        if (!successMessage) {
            return;
        }

        const timer =
            setTimeout(
                () =>
                    setSuccessMessage(
                        "",
                    ),
                5000,
            );

        return () =>
            clearTimeout(timer);

    }, [successMessage]);

    function handleCreateProduct() {

        if (
            !name.trim()
            || rate <= 0
        ) {
            return;
        }

        setModalType(
            "create",
        );
    }

    function handleUpdateRate() {

        if (
            !selectedProduct
            || newRate <= 0
        ) {
            return;
        }

        setModalType(
            "update-rate",
        );
    }

    async function confirmAction() {

        try {

            if (
                modalType ===
                "create"
            ) {

                await createProduct({
                    name,
                    unit,
                    rate,
                });

                setName("");
                setUnit("Kg");
                setRate(0);

                setSuccessMessage(
                    "Product created successfully",
                );
            }

            if (
                modalType ===
                "update-rate"
            ) {

                if (
                    !selectedProduct
                ) {
                    return;
                }

                await updateProductRate({
                    name:
                        selectedProduct.name,
                    rate:
                        newRate,
                });

                setSelectedProduct(
                    null,
                );

                setSearchValue(
                    "",
                );

                setNewRate(0);

                setSuccessMessage(
                    "Product rate updated successfully",
                );
            }

            setModalType(
                null,
            );

        } catch (error) {

            console.error(
                error,
            );

            setModalType(
                null,
            );
        }
    }

    return (
        <PageLayout
            title="Product Management"
            description="Manage Products"
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
                title="Add Product"
            >

                <div
                    className="
                        space-y-3
                    "
                >

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value,
                            )
                        }
                        placeholder="Product Name"
                        className="
                            w-full
                            border
                            rounded
                            p-2
                        "
                    />

                    <select
                        value={unit}
                        onChange={(e) =>
                            setUnit(
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
                        {units.map(
                            (
                                unit,
                            ) => (
                                <option
                                    key={
                                        unit
                                    }
                                    value={
                                        unit
                                    }
                                >
                                    {unit}
                                </option>
                            ),
                        )}
                    </select>

                    <input
                        type="number"
                        min={0}
                        value={rate}
                        onChange={(e) =>
                            setRate(
                                Number(
                                    e.target
                                        .value,
                                ),
                            )
                        }
                        placeholder="Rate"
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
                            handleCreateProduct
                        }
                        className="
                            bg-green-700
                            text-white
                            px-4
                            py-2
                            rounded
                        "
                    >
                        Create Product
                    </button>

                </div>
            </SectionCard>

            <SectionCard
                title="Update Product Rate"
            >

                <h2
                    className="
                        text-xl
                        font-semibold
                        mb-4
                    "
                >
                    
                </h2>

                <ProductSearch
                    value={
                        searchValue
                    }
                    onChange={
                        setSearchValue
                    }
                    onSelect={(
                        product,
                    ) => {

                        setSelectedProduct(
                            product,
                        );

                        setSearchValue(
                            product.name,
                        );
                    }}
                />

                {selectedProduct && (
                    <div
                        className="
                            mt-4
                            space-y-3
                        "
                    >

                        <div>
                            Current Rate:
                            {" "}
                            ₹
                            {
                                selectedProduct.rate
                            }
                            /
                            {
                                selectedProduct.unit
                            }
                        </div>

                        <input
                            type="number"
                            min={0}
                            value={
                                newRate
                            }
                            onChange={(
                                e,
                            ) =>
                                setNewRate(
                                    Number(
                                        e
                                            .target
                                            .value,
                                    ),
                                )
                            }
                            placeholder="New Rate"
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
                                handleUpdateRate
                            }
                            className="
                                bg-green-700
                                text-white
                                px-4
                                py-2
                                rounded
                            "
                        >
                            Update Rate
                        </button>

                    </div>
                )}

            </SectionCard>

            {modalType && (
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
                            {modalType ===
                            "create"
                                ? "Create Product"
                                : "Update Product Rate"}
                        </h2>

                        {modalType ===
                            "create" && (
                            <div className="space-y-2">
                                <div>
                                    Name:
                                    {" "}
                                    {name}
                                </div>

                                <div>
                                    Unit:
                                    {" "}
                                    {unit}
                                </div>

                                <div>
                                    Rate:
                                    {" "}
                                    ₹
                                    {rate}
                                </div>
                            </div>
                        )}

                        {modalType ===
                            "update-rate" &&
                            selectedProduct && (
                                <div className="space-y-2">

                                    <div>
                                        Product:
                                        {" "}
                                        {
                                            selectedProduct.name
                                        }
                                    </div>

                                    <div>
                                        Current Rate:
                                        {" "}
                                        ₹
                                        {
                                            selectedProduct.rate
                                        }
                                        /
                                        {
                                            selectedProduct.unit
                                        }
                                    </div>

                                    <div>
                                        New Rate:
                                        {" "}
                                        ₹
                                        {
                                            newRate
                                        }
                                        /
                                        {
                                            selectedProduct.unit
                                        }
                                    </div>

                                </div>
                            )}

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
                                    setModalType(
                                        null,
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
                                onClick={
                                    confirmAction
                                }
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