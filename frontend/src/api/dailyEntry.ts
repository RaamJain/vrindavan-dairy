import { apiClient } from "./client";

export async function getAutofillData(
    customerId: number,
    date: string,
    shift: string,
) {
    const response = await apiClient.get(
        "/daily-entry/autofill",
        {
            params: {
                customer_id: customerId,
                date,
                shift,
            },
        },
    );

    return response.data;
}

export async function saveDailyEntry(
    payload: unknown,
) {
    const response =
        await apiClient.post(
            "/daily-entry",
            payload,
        );
    return response.data;
}