export class Cart {
    CartId: number;
    ProductId: number;
    ProductName: string;
    Quantity: number;
    Price: number;

    constructor(CartId, ProductId, ProductName, Quantity, Price){
        this.CartId = CartId;
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.Quantity = Quantity;
        this.Price = Price;
    }
}
