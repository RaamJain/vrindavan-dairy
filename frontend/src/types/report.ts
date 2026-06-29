export interface CustomerReport {
    customer: {
        id: number;
        name: string;
        contact_number?: string;
        address?: string;
        account_balance: number;
    };

    milk_summary: {
        cow_total: number;
        buffalo_total: number;

        cow_rate: number;
        buffalo_rate: number;

        cow_amount: number;
        buffalo_amount: number;

        milk_amount: number;
    };

    daily_ledger: DailyLedgerEntry[];

    extras: ExtraProductReport[];

    billing_summary: {
        milk_amount: number;
        extras_amount: number;
        account_balance: number;
        final_amount_due: number;
    };
}

export interface DailyLedgerEntry {
    day: number;

    morning_cow: number;
    morning_buffalo: number;

    evening_cow: number;
    evening_buffalo: number;
}

export interface ExtraProductReport {
    product_name: string;

    entries: ExtraEntry[];

    unit: string;

    rate: number;

    total_quantity: number;

    amount: number;
}

export interface ExtraEntry {
    date: string;

    shift: string;

    quantity: number;
}