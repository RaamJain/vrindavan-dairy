export interface Milk {
    cow: number;
    buffalo: number;
}
  
export interface ExtraItem {
    product_name: string;
    quantity: number;
}
  
export interface DailyEntryRequest {  
    customer_name: string;
    date: string;
    shift: string;
    milk: Milk;
    extras: ExtraItem[];
  }