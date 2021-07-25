import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { Wishlist } from 'src/app/models/wishlist.model';
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
    public msgService: MessageService
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
      }
      else{
        this.cartItems[findIndex].Quantity += 1;
      }
      this.updateTotalPrice();
    });
  }

  updateTotalPrice(){
    this.TotalPrice = this.cartItems.reduce((prev, curr)=>{
      return parseFloat((curr.Quantity * curr.Price).toFixed(2));
    },0)
  }

}
