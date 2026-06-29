import { apiClient } from "./client";

import type {
    CustomerPaymentSummary,
    RecordPaymentPayload,
    PaymentHistoryItem,
} from "../types/payment";


export async function
getCustomerPaymentSummary(
    customerId: number,
): Promise<
    CustomerPaymentSummary
> {

    const response =
        await apiClient.get(
            "/payments/customer-summary",
            {
                params: {
                    customer_id:
                        customerId,
                },
            },
        );

    return response.data;
}


export async function
recordPayment(
    payload:
        RecordPaymentPayload,
) {

    const response =
        await apiClient.post(
            "/payments",
            payload,
        );

    return response.data;
}


export async function
getPaymentHistory(
    customerId: number,
): Promise<
    PaymentHistoryItem[]
> {

    const response =
        await apiClient.get(
            "/payments/history",
            {
                params: {
                    customer_id:
                        customerId,
                },
            },
        );

    return response.data;
}