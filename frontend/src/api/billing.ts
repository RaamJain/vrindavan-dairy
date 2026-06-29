import { apiClient } from "./client";

import type {
    BillingResponse,
} from "../types/billing";


export async function generateBill(
    customerId: number,
    month: number,
    year: number,
): Promise<BillingResponse> {

    const response =
        await apiClient.post(
            "/billing/generate",
            null,
            {
                params: {
                    customer_id:
                        customerId,

                    month,

                    year,
                },
            },
        );

    return response.data;
}