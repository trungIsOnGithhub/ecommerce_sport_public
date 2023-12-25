export interface DataPaymentType {
    total_cost: string;
    status: string;
    payment_method: string;
    customer_program?: {
        price: number;
        promotion: string;
    }[];
    stadium_areas: string[];
}
