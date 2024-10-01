export interface Customer {
    // customerId: number;
    name: string;
}
export interface CustomerReceipt {
    customerId: number;
    customerName: string;
    date: Date;
    amount: number;
    paymentType: string;
    explanation: string;
}

export interface Expenses{
    date:Date,
    amount: number,
    supplier: string,
    paymentMethods:string,
    detail:string
}