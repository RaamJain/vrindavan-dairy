import { apiClient } from "./client";

import type { Product } from "../types/product";

export async function searchProducts(
    query: string,
): Promise<Product[]> {
    const response =
        await apiClient.get(
            "/products/search",
            {
                params: {
                    query,
                },
            },
        );

    return response.data;
}

export async function createProduct(
    payload: {
        name: string;
        unit: string;
        rate: number;
    },
) {
    const response =
        await apiClient.post(
            "/products",
            payload,
        );

    return response.data;
}

export async function updateProductRate(
    payload: {
        name: string;
        rate: number;
    },
) {
    const response =
        await apiClient.patch(
            "/products/update-price",
            payload,
        );

    return response.data;
}