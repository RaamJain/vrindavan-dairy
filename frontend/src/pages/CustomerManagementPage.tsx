import { useEffect } from "react";
import { useState } from "react";

import {
    createCustomer,
    updateCustomer,
    activateCustomer,
    deactivateCustomer,
    
} from "../api/customers";

import CustomerManagementSearch from "../components/CustomerManagementSearch";

import type {
    Customer,
} from "../types/customer";

import PageLayout from "../components/PageLayout"
import SectionCard from "../components/SectionCard";

export default function CustomerManagementPage() {
    const [
        name,
        setName,
    ] = useState("");

    const [
        contactNumber,
        setContactNumber,
    ] = useState("");

    const [
        address,
        setAddress,
    ] = useState("");

    const [
        accountBalance,
        setAccountBalance,
    ] = useState("0");

    const [
        editTarget,
        setEditTarget,
    ] = useState<Customer | null>(
        null,
    );
    
    const [
        editName,
        setEditName,
    ] = useState("");
    
    const [
        editContactNumber,
        setEditContactNumber,
    ] = useState("");
    
    const [
        editAddress,
        setEditAddress,
    ] = useState("");
    
    const [
        editAccountBalance,
        setEditAccountBalance,
    ] = useState("0");

    const [
        deactivateTarget,
        setDeactivateTarget,
    ] = useState<Customer | null>(
        null,
    );

    const [
        activateTarget,
        setActivateTarget,
    ] = useState<Customer | null>(
        null,
    );

    const [
        modalType,
        setModalType,
    ] = useState<
        "create"
        | "activate"
        | "deactivate"
        | "edit"
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

        const timer = setTimeout(
            () => {
                setSuccessMessage("");
            },
            5000,
        );

        return () =>
            clearTimeout(timer);
    }, [successMessage]);

    function handleCreateCustomer() {
        if (
            !name.trim()
            || !contactNumber.trim()
        ) {
            return;
        }

        setModalType("create");
    }

    function handleDeactivateCustomer() {
        if (!deactivateTarget) {
            return;
        }

        setModalType(
            "deactivate",
        );
    }

    function handleActivateCustomer() {
        if (!activateTarget) {
            return;
        }

        setModalType(
            "activate",
        );
    }

    function handleEditCustomer() {

        if (!editTarget) {
            return;
        }
    
        if (
            !editName.trim()
            || !editContactNumber.trim()
        ) {
            return;
        }
    
        setModalType("edit");
    }

    async function confirmAction() {
        try {
            if (
                modalType === "create"
            ) {
                await createCustomer({
                    name,
                    contact_number:
                        contactNumber,
                    address,
                    account_balance:Number(accountBalance),
                });

                setName("");
                setContactNumber("");
                setAddress("");
                setAccountBalance("0");

                setSuccessMessage(
                    "Customer created successfully",
                );
            }

            if (
                modalType ===
                "deactivate"
            ) {
                if (
                    !deactivateTarget
                ) {
                    return;
                }

                await deactivateCustomer(
                    {
                        name:
                            deactivateTarget.name,
                        contact_number:
                            deactivateTarget.contact_number,
                    },
                );

                setDeactivateTarget(
                    null,
                );

                setSuccessMessage(
                    "Customer deactivated successfully",
                );
            }

            if (
                modalType ===
                "activate"
            ) {
                if (
                    !activateTarget
                ) {
                    return;
                }

                await activateCustomer(
                    {
                        name:
                            activateTarget.name,
                        contact_number:
                            activateTarget.contact_number,
                    },
                );

                setActivateTarget(
                    null,
                );

                setSuccessMessage(
                    "Customer activated successfully",
                );
            }

            if (

                modalType === "edit"
            
            ) {
            
                if (!editTarget) {
            
                    return;
            
                }
            
                await updateCustomer(
            
                    editTarget.id,
            
                    {
            
                        name: editName,
            
                        contact_number: editContactNumber,
            
                        address: editAddress,
            
                        account_balance: Number(
            
                            editAccountBalance,
            
                        ),
            
                    },
            
                );
            
                setEditTarget(null);
            
                setEditName("");
            
                setEditContactNumber("");
            
                setEditAddress("");
            
                setEditAccountBalance("0");
            
                setSuccessMessage(
            
                    "Customer updated successfully",
            
                );
            
            }

            setModalType(null);
        } catch (error) {
            console.error(error);

            setModalType(null);
        }
    }

    return (
        <PageLayout

            title="Customer Management"

            description="Create, activate and manage customers."

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
                title="Add Customer"
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
                        placeholder="Name"
                        className="
                            w-full
                            border
                            rounded
                            p-2
                        "
                    />

                    <input
                        value={
                            contactNumber
                        }
                        onChange={(e) =>
                            setContactNumber(
                                e.target.value,
                            )
                        }
                        placeholder="Contact Number"
                        className="
                            w-full
                            border
                            rounded
                            p-2
                        "
                    />

                    <input
                        value={address}
                        onChange={(e) =>
                            setAddress(
                                e.target.value,
                            )
                        }
                        placeholder="Address"
                        className="
                            w-full
                            border
                            rounded
                            p-2
                        "
                    />

                    <input
                        type="number"
                        value={accountBalance}
                        onChange={(e) =>
                            setAccountBalance(
                                    e.target.value,
                            )
                        }
                        placeholder="Opening Balance"
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
                            handleCreateCustomer
                        }
                        className="
                            bg-green-700
                            text-white
                            px-4
                            py-2
                            rounded
                        "
                    >
                        Create Customer
                    </button>
                </div>
            </SectionCard>
            
            <SectionCard
                title="Edit Customer"
            >

                <div
                    className="
                        space-y-4
                    "
                >

                    {!editTarget && (

                        <CustomerManagementSearch
                            onSelect={(
                                customer,
                            ) => {

                                setEditTarget(
                                    customer,
                                );

                                setEditName(
                                    customer.name,
                                );

                                setEditContactNumber(
                                    customer.contact_number,
                                );

                                setEditAddress(
                                    customer.address,
                                );

                                setEditAccountBalance(
                                    customer.account_balance.toString(),
                                );

                            }}
                        />

                    )}

                    {editTarget && (

                        <>

                            <input
                                value={editName}
                                onChange={(e) =>
                                    setEditName(
                                        e.target.value,
                                    )
                                }
                                placeholder="Name"
                                className="
                                    w-full
                                    border
                                    rounded
                                    p-2
                                "
                            />

                            <input
                                value={
                                    editContactNumber
                                }
                                onChange={(e) =>
                                    setEditContactNumber(
                                        e.target.value,
                                    )
                                }
                                placeholder="Contact Number"
                                className="
                                    w-full
                                    border
                                    rounded
                                    p-2
                                "
                            />

                            <input
                                value={editAddress}
                                onChange={(e) =>
                                    setEditAddress(
                                        e.target.value,
                                    )
                                }
                                placeholder="Address"
                                className="
                                    w-full
                                    border
                                    rounded
                                    p-2
                                "
                            />

                            <input
                                type="number"
                                value={
                                    editAccountBalance
                                }
                                onChange={(e) =>
                                    setEditAccountBalance(
                                        e.target.value,
                                    )
                                }
                                placeholder="Account Balance"
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
                                    handleEditCustomer
                                }
                                className="
                                    bg-green-700
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                "
                            >
                                Save Changes
                            </button>

                        </>

                    )}

                </div>

            </SectionCard>

            <SectionCard
                title="Deactivate Customer"
            >

                <CustomerManagementSearch
                    searchMode="active"
                    onSelect={
                        setDeactivateTarget
                    }
                />

                {deactivateTarget && (
                    <div
                        className="
                            mt-4
                            space-y-2
                        "
                    >
                        <div>
                            {
                                deactivateTarget.name
                            }
                        </div>

                        <button
                            type="button"
                            onClick={
                                handleDeactivateCustomer
                            }
                            className="
                                bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded
                            "
                        >
                            Deactivate
                        </button>
                    </div>
                )}
            </SectionCard>

            <SectionCard
                title="Activate Customer"
            >
                <CustomerManagementSearch
                    searchMode="inactive"
                    onSelect={
                        setActivateTarget
                    }
                />

                {activateTarget && (
                    <div
                        className="
                            mt-4
                            space-y-2
                        "
                    >
                        <div>
                            {
                                activateTarget.name
                            }
                        </div>

                        <button
                            type="button"
                            onClick={
                                handleActivateCustomer
                            }
                            className="
                                bg-green-700
                                text-white
                                px-4
                                py-2
                                rounded
                            "
                        >
                            Activate
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
                                ? "Create Customer"
                                : modalType ===
                                    "edit"
                                ? "Edit Customer"
                                : modalType ===
                                  "activate"
                                ? "Activate Customer"
                                : "Deactivate Customer"}
                        </h2>

                        {modalType ===
                            "create" && (
                            <div className="space-y-2">
                                <div>
                                    Name:{" "}
                                    {name}
                                </div>

                                <div>
                                    Phone:{" "}
                                    {
                                        contactNumber
                                    }
                                </div>

                                <div>
                                    Address:{" "}
                                    {address ||
                                        "Satna"}
                                </div>

                                <div>
                                    Opening Balance: ₹
                                    {accountBalance}
                                </div>


                            </div>
                        )}

                        {modalType ===
                            "edit" &&
                            editTarget && (
                                <div className="space-y-2">
                                    
                                    <div className="font-semibold">
                                        NEW DETAILS ↓
                                    </div>
                                    <div>
                                        Name:{" "}
                                        {editName}
                                    </div>

                                    <div>
                                        Contact Number:{" "}
                                        {editContactNumber}
                                    </div>

                                    <div>
                                        Address:{" "}
                                        {editAddress}
                                    </div>

                                    <div>
                                        Account Balance: ₹
                                        {editAccountBalance}
                                    </div>

                                </div>
                        )}

                        {modalType ===
                            "activate" &&
                            activateTarget && (
                                <div className="space-y-2">
                                    <div>
                                        Name:{" "}
                                        {
                                            activateTarget.name
                                        }
                                    </div>

                                    <div>
                                        Phone:{" "}
                                        {
                                            activateTarget.contact_number
                                        }
                                    </div>
                                </div>
                            )}

                        {modalType ===
                            "deactivate" &&
                            deactivateTarget && (
                                <div className="space-y-2">
                                    <div>
                                        Name:{" "}
                                        {
                                            deactivateTarget.name
                                        }
                                    </div>

                                    <div>
                                        Phone:{" "}
                                        {
                                            deactivateTarget.contact_number
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