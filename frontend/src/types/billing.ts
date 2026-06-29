export interface BillingResponse {

    message: string;

    customer: string;

    month: number;

    year: number;

    milk_amount: number;

    extras_amount: number;

    bill_amount: number;

    payments_received: number;

    previous_dues: number;

    current_dues: number;

    account_balance: number;
}