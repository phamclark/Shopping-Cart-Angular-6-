export class FitlerProduct {
    ProductName: string;
    FromPrice: number;
    ToPrice: number;

    constructor(ProductName, FromPrice, ToPrice) {
        this.ProductName = ProductName;
        this.FromPrice = FromPrice;
        this.ToPrice = ToPrice;
    }
}
