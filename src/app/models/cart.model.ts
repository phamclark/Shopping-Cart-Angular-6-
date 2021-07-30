export class Cart {
    CartId: number;
    ProductId: number;
    ProductName: string;
    Quantity: number;
    Price: number;
    Total: number;

    constructor(CartId, ProductId, ProductName, Quantity, Price, Total) {
        this.CartId = CartId;
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.Quantity = Quantity;
        this.Price = Price;
        this.Total = Total;
    }
}
