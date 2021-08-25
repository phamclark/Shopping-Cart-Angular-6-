import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  paged: string;
  productList: Product[];
  productList$: Observable<Product[]>;
  constructor(
    public productService: ProductService,
    public msgService: MessageService
  ) { }

  ngOnInit() {
    this.productList$ = this.productService.getProductsWithCache;
    this.getPaged();
    this.msgService.getMsgFilter().subscribe(_ => {
      this.productList$ = this.productService.productWithFilter;
      this.getPaged();
    });
  }

  getPaged(){
    this.productList$.subscribe(products=> {
      this.paged = 'Showing ' + products.length + ' products'
    })
  }

}
