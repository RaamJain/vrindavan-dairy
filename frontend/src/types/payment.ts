export interface LatestPayment {
    balance_before: number;

    payment_amount: number;

    balance_after: number;

    mode: string;

    date: string;

    notes: string;
}

export interface CustomerPaymentSummary {
    customer_id: number;

    customer_name: string;

    account_balance: number;

    latest_payment:
        LatestPayment | null;
}

export interface RecordPaymentPayload {
    customer_id: number;

    payment_amount: number;

    mode: string;

    notes: string;
}

export interface PaymentHistoryItem {

    balance_before: number;

    payment_amount: number;

    balance_after: number;

    mode: string;

    date: string;

    notes: string;
}