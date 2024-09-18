export class Customer {
    customerId: number;
    customerName: string;
    constructor(customerId: number,
        customerName: string) {
        this.customerId = customerId;
        this.customerName = customerName;
    }
}