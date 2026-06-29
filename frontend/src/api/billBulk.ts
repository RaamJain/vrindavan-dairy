import { apiClient } from "./client";

import type {
    BillPreview,
} from "../types/billPreview";

export async function getBulkBillPreview(
    month: number,
    year: number,
): Promise<BillPreview[]> {

    const response =
        await apiClient.get(
            "/billing/bulk-preview",
            {
                params: {
                    month,
                    year,
                },
            },
        );

    return response.data;
}