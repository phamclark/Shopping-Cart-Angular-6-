import { Component, OnInit } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { Wishlist } from 'src/app/models/wishlist.model';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems : Cart[] = [];

  TotalPrice: number;
  constructor(
    public msgService: MessageService,
    public cartService: CartService
  ) { }

ngOnInit() {
    this.msgService.getMsg().subscribe((product : Product)=>{
      let findIndex = this.cartItems.findIndex(prod=>prod.ProductId == product.ProductId);
      if(findIndex == -1){
        this.cartItems.push(
          new Cart(
            1, 
            product.ProductId, 
            product.ProductDescription, 
            1, 
            product.ProductPrice 
        ));
        this.updateTotalPrice();
      }
      else{
        this.cartItems[findIndex].Quantity += 1;
        this.updateTotalPrice();
      }
    });

    this.cartService.cartList$ = of(this.cartItems);
    combineLatest(
      this.cartService.cartList$,
      this.cartService.deleteCartItem$
    ).pipe(
      map(([cartList, deleteItems])=>{
        if(deleteItems){
          var findIndex = cartList.findIndex((cart: Cart)=> cart.ProductId === deleteItems.ProductId);
          if(findIndex>= 0){
            cartList.splice(findIndex, 1);
          } 
          this.updateTotalPrice();
          return cartList;
        }
        else{
          this.updateTotalPrice();
          return cartList.concat(deleteItems);
        }
      })
      ).subscribe();

     
  }

  updateTotalPrice(){
    this.TotalPrice = this.cartItems.reduce((prev, curr)=>{
      return parseFloat(prev.toFixed(2)) + parseFloat((curr.Quantity * curr.Price).toFixed(2));
    },0)
  }

}
