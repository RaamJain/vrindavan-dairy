import { apiClient } from "./client";

import type {
    Customer,
} from "../types/customer";


export async function searchCustomers(
    query: string,
): Promise<Customer[]> {

    const response =
        await apiClient.get(
            "/customers/search",
            {
                params: {
                    query,
                },
            },
        );

    return response.data;

}


export async function searchInactiveCustomers(
    query: string,
): Promise<Customer[]> {

    const response =
        await apiClient.get(
            "/customers/search-inactive",
            {
                params: {
                    query,
                },
            },
        );

    return response.data;

}


export async function getCustomers(): Promise<Customer[]> {

    const response =
        await apiClient.get(
            "/customers",
        );

    return response.data;

}


export async function createCustomer(
    payload: {
        name: string;
        contact_number: string;
        address: string;
        account_balance: number;
    },
) {

    const response =
        await apiClient.post(
            "/customers",
            payload,
        );

    return response.data;

}


export async function activateCustomer(
    payload: {
        name: string;
        contact_number: string;
    },
) {

    const response =
        await apiClient.patch(
            "/customers/activate",
            payload,
        );

    return response.data;

}


export async function deactivateCustomer(
    payload: {
        name: string;
        contact_number: string;
    },
) {

    const response =
        await apiClient.patch(
            "/customers/deactivate",
            payload,
        );

    return response.data;

}


export async function searchAllCustomers(
    name: string,
): Promise<Customer[]> {

    const response =
        await apiClient.get(
            "/customers/search-all",
            {
                params: {
                    name,
                },
            },
        );

    return response.data;

}


export interface UpdateCustomerRequest {

    name: string;

    contact_number: string;

    address: string;

    account_balance: number;

}


export async function updateCustomer(
    customerId: number,
    payload: UpdateCustomerRequest,
): Promise<{
    message: string;
}> {

    const response =
        await apiClient.patch(
            "/customers/edit",
            payload,
            {
                params: {
                    customer_id: customerId,
                },
            },
        );

    return response.data;

}