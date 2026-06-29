import { apiClient } from "./client";

import type {
    BillPreview,
    BillPreviewError,
} from "../types/billPreview";


export async function getBillPreview(
    customerId: number,
    month: number,
    year: number,
): Promise<BillPreview | BillPreviewError> {

    const response =
        await apiClient.get(
            "/billing/preview",
            {
                params: {
                    customer_id: customerId,
                    month,
                    year,
                },
            },
        );

    return response.data;
}