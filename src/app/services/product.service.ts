import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FitlerProduct } from '../models/filter.model';
import { Product } from '../models/product.model';
import { pipe, timer, Subscriber } from 'rxjs';
import { tap, map, shareReplay, retryWhen, delayWhen, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$: Observable<Product[]>;

  products: Product[] = [
    new Product(1, 'PRDT-SHIRT', 300, '100% Cotton in Care & Share T-shirt new version - black.', 'https://mcdn.coolmate.me/uploads/June2021/1-0.jpg'),
    new Product(2, 'PRDT-SHIRT-Special Edition', 500, 'Men 100% Cotton Essential Tee Printed T-shirt Special Edition.', 'https://mcdn.coolmate.me/uploads/July2021/124-0_(4)_85.jpg'),
    new Product(3, 'PRD', 450, 'Men 100% Cotton Essential Sports Polo Shirt ProMax-S1 Logo', 'https://mcdn.coolmate.me/uploads/July2021/3-0_(1)_copy.jpg'),
    new Product(4, 'PRDT-SHIRT', 300, '100% Cotton in Care & Share T-shirt new version - black.', 'https://mcdn.coolmate.me/uploads/June2021/2-0.jpg'),
    new Product(5, 'PRDT-SHIRT-Special Edition', 500, 'Men 100% Cotton Essential Tee Printed T-shirt Special Edition.', 'https://mcdn.coolmate.me/uploads/July2021/2-0_(2)_copy.jpg'),
    new Product(6, 'PRD', 250, 'Men 100% Cotton Compact Prime-Everyday Polo Shirt - cool to wear', 'https://mcdn.coolmate.me/uploads/June2021/3-0_31.jpg')
  ];
  formFilter: FitlerProduct;

  constructor(
    public httpClient: HttpClient
  ) { }

  // Populate products from API and return Observable
  getProducts() {
    return this.products;
  }

  get getProductsWithCache() {
    if (!this.products$) {
      this.products$ = this.getProductsObservable().pipe(
        shareReplay(1)
      );
    }
    return this.products$;
  }

  get productWithFilter() {
    this.products$ = this.getProductsObservable().pipe(
      tap(_ => console.log('Filter Products')),
      map(products => products
        .filter(_ => _.ProductPrice <= this.formFilter.ToPrice && _.ProductPrice >= this.formFilter.FromPrice)
        .filter(_ => _.ProductDescription.toLowerCase().indexOf(this.formFilter.ProductName.toLowerCase()) > -1)));
      return this.products$;
  }
  private getProductsObservable() {
    // // const ob = of(this.products);
    // return ob.pipe(
    //   map(products => products)
    // );

    return this.httpClient.get<any>(environment.API + '/ShoppingCart/GetProducts').pipe(
      map(products => products)
    );
  }
}
