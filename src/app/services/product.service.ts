import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    new Product(1, 'PRDT-SHIRT',300,'100% Cotton in Care & Share T-shirt new version - black.','https://mcdn.coolmate.me/uploads/June2021/1-0.jpg'),
    new Product(2, 'PRDT-SHIRT-Special Edition', 500,'Men 100% Cotton Essential Tee Printed T-shirt Special Edition.','https://mcdn.coolmate.me/uploads/July2021/124-0_(4)_85.jpg'),
    new Product(3, 'PRD', 450,'Men 100% Cotton Essential Sports Polo Shirt ProMax-S1 Logo','https://mcdn.coolmate.me/uploads/July2021/3-0_(1)_copy.jpg'),
    new Product(4, 'PRDT-SHIRT',300,'100% Cotton in Care & Share T-shirt new version - black.','https://mcdn.coolmate.me/uploads/June2021/1-0.jpg'),
    new Product(5, 'PRDT-SHIRT-Special Edition', 500,'Men 100% Cotton Essential Tee Printed T-shirt Special Edition.','https://mcdn.coolmate.me/uploads/July2021/124-0_(4)_85.jpg'),
    new Product(6, 'PRD', 450,'Men 100% Cotton Essential Sports Polo Shirt ProMax-S1 Logo','https://mcdn.coolmate.me/uploads/July2021/3-0_(1)_copy.jpg')
  ]
  constructor() { }

  //Populate products from API and return Observable
  getProducts(){
    return this.products;
  }
}
