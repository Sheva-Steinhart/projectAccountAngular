export class CustomerReceipt {
    customerId: number;
    customerName: string;
    date: Date;
    amount: number;
    paymentType: string;
    explanation: string;
    constructor(customerId: number,
        customerName: string,
        date: Date,
        amount: number,
        paymentType: string,
        explanation: string) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.date = date;
        this.amount = amount;
        this.paymentType = paymentType;
        this.explanation = explanation;
    }
}