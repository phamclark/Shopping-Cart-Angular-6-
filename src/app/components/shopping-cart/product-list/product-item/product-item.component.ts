import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;

  constructor(
    public msgService: MessageService
  ) { }

  ngOnInit() {
  }

  addOrEditCart(product: Product){
    this.msgService.sendMsg(product);
  }
}
