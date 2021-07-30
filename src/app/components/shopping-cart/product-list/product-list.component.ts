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

  productList: Product[];
  productList$: Observable<Product[]>;
  constructor(
    public productService: ProductService,
    public msgService: MessageService
  ) { }

  ngOnInit() {
    this.productList$ = this.productService.getProductsWithCache;

    this.msgService.getMsgFilter().subscribe(_ => {
      this.productList$ = this.productService.productWithFilter;
    });
  }

}
