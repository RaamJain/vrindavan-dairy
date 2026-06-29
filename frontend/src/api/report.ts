import { apiClient } from "./client";

export async function getCustomerMonthlyReport(
    customerId: number,
    month: number,
    year: number,
) {
    const response =
        await apiClient.get(
            "/reports/customer-monthly",
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