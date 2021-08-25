import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';
import { SignalRSocketService } from 'src/app/services/signalR.socket.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  paged: string;
  productListNav$: Observable<Product[]>;
  numberOfProducts: number = 0;
  cartItemsNav: Cart[] = [];
  TotalPrice: number = 0;

  constructor(
    public productService: ProductService,
    public msgService: MessageService,
    public cartService: CartService,
    public signalR: SignalRSocketService
  ) { }

  ngOnInit() {
    this.signalR.signalRInitial();
    this.msgService.getMsg().subscribe((product: Product) => {
      const findIndex = this.cartItemsNav.findIndex(prod => prod.ProductId === product.ProductId);
      if (findIndex === -1) {
        this.cartItemsNav.push(
          new Cart(
            1,
            product.ProductId,
            product.ProductDescription,
            1,
            product.ProductPrice,
            product.ProductPrice
        ));
        this.updateTotalPrice();
      } else {
        this.cartItemsNav[findIndex].Quantity += 1;
        this.cartItemsNav[findIndex].Total = this.cartItemsNav[findIndex].Quantity * this.cartItemsNav[findIndex].Price;
        this.updateTotalPrice();
      }
    });

    // reference https://stackoverflow.com/questions/64721810/remove-item-shopping-cart-angular
    // and made some updates
    this.cartService.cartList$ = of(this.cartItemsNav);
    combineLatest(
      this.cartService.cartList$,
      this.cartService.deleteCartItem$
    ).pipe(
      map(([cartList, deleteItems]) => {
        if (deleteItems) {
          const findIndex = cartList.findIndex((cart: Cart) => cart.ProductId === deleteItems.ProductId);
          if (findIndex >= 0) {
            cartList.splice(findIndex, 1);
          }
          this.updateTotalPrice();
          return cartList;
        } else {
          this.updateTotalPrice();
          return cartList.concat(deleteItems);
        }
      })
      ).subscribe();
  }

  updateTotalPrice() {
    this.TotalPrice = this.cartItemsNav.reduce((prev, curr) => {
      return parseFloat(prev.toFixed(2)) + parseFloat((curr.Quantity * curr.Price).toFixed(2));
    }, 0);

    this.numberOfProducts = this.cartItemsNav.reduce((prev, curr) => {
      return prev + curr.Quantity;
    }, 0);
  }
}