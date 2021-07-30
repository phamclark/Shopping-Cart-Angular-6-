export class Product {
    ProductId: number;
    ProductSKU: string;
    ProductPrice: number;
    ProductDescription: string;
    ProductImageUrl: string;
    ProductTags: string;

    constructor(ProductId, ProductSKU, ProductPrice, ProductDescription, ProductImageUrl, ProductTags= '') {
        this.ProductId = ProductId;
        this.ProductSKU = ProductSKU;
        this.ProductPrice = ProductPrice;
        this.ProductDescription = ProductDescription;
        this.ProductImageUrl = ProductImageUrl;
        this.ProductTags = ProductTags;
    }
}
