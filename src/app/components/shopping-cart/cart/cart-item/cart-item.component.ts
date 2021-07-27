import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: Cart;
  
  constructor(
    public cartService: CartService
  ) { }

  ngOnInit() {
  }

  deleteCartItemFunc(card: Cart){
    debugger
    this.cartService.deleteCartItem$.next(card);
  }

}
