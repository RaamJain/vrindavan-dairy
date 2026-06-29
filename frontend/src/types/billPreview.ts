export interface BillPreview {
    
    month: number;
    year: number;
    latest_payment: string;
    last_payment: number;
    
    customer: {
        id: number;
        name: string;
        contact_number: string;
        address: string;
        account_balance: number;
    };

    daily_ledger: {
        day: number;
        morning_cow: number;
        morning_buffalo: number;
        evening_cow: number;
        evening_buffalo: number;
    }[];

    milk_summary: {
        cow_total: number;
        buffalo_total: number;
        cow_rate: number;
        buffalo_rate: number;
        cow_amount: number;
        buffalo_amount: number;
        milk_amount: number;
    };

    extras: {
        product_name: string;

        entries: {
            date: string;
            shift: string;
            quantity: number;
        }[];

        unit: string;
        rate: number;
        total_quantity: number;
        amount: number;
    }[];

    monthly_total: number;

    bill_amount: number;

    payments_received: number;

    previous_dues: number;

    account_balance: number;

}

export interface BillPreviewError {
    message: string;
}