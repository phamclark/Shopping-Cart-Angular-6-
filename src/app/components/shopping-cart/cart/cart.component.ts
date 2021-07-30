import { Component, OnInit } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { BaseResponse } from 'src/app/models/baseResponse.model';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { Wishlist } from 'src/app/models/wishlist.model';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'src/app/services/message.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Cart[] = [];
  private config: MatSnackBarConfig;
  TotalPrice: number;
  constructor(
    public msgService: MessageService,
    public cartService: CartService,
    public snackBar : MatSnackBar,
    public dialog: MatDialog,
  ) { 
    this.config = new MatSnackBarConfig();
    this.config.duration = 2000;
  }

ngOnInit() {
    console.log('Cart Component ngOnInit...');
    this.msgService.getMsg().subscribe((product: Product) => {
      const findIndex = this.cartItems.findIndex(prod => prod.ProductId === product.ProductId);
      if (findIndex === -1) {
        this.cartItems.push(
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
        this.cartItems[findIndex].Quantity += 1;
        this.cartItems[findIndex].Total = this.cartItems[findIndex].Quantity * this.cartItems[findIndex].Price;
        this.updateTotalPrice();
      }
    });

    // reference https://stackoverflow.com/questions/64721810/remove-item-shopping-cart-angular
    // and made some updates
    this.cartService.cartList$ = of(this.cartItems);
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
    this.TotalPrice = this.cartItems.reduce((prev, curr) => {
      return parseFloat(prev.toFixed(2)) + parseFloat((curr.Quantity * curr.Price).toFixed(2));
    }, 0);
  }

  showSnackbar(message: string, duration?: number, action?: string) {
    this.config = duration ? Object.assign(this.config, { 'duration': duration,  'verticalPosition': 'top', 'panelClass' :'showSnackbar' }) : this.config;
    this.snackBar.open(message, action, this.config);
  }
  addOrder() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "20%";
    this.dialog.open(PaymentComponent, dialogConfig).afterClosed().subscribe(res=>{
      if(this.cartService.completeOrder){
        this.cartItems =[];
        this.cartService.completeOrder = false;
      }
    });
  }
}
