import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.model';
import { Order } from '../models/order.models';
import { OrderItem } from '../models/orderItem.model';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  completeOrder: boolean;
  cartList$: Observable<Cart[]>;
  deleteCartItem$ = new Subject<Cart>();
  constructor(
    public httpClient: HttpClient
  ) { }

  addOrder() {
    let orderItems = this.getOrderItem() ;
    let order: Order = {
      OrderId :  0,
      OrderNo : Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerId : 1,
      PMethod : 'Card',
      GTotal : this.GetCartTotal(orderItems)
    };

    let body = {
      ...order,
      OrderItems : orderItems
    };
    console.log('Request payload...', body);
    return this.httpClient.post(environment.API + '/ShoppingCart/AddOrder', body).toPromise();
  }

  GetCartTotal(orderItems: OrderItem[]) {
    let GTotal = 0;
    GTotal = orderItems.reduce((prev, curr) => {
      return parseFloat(prev.toFixed(2)) + parseFloat((curr.Quantity * curr.Price).toFixed(2));
    }, 0);
    return GTotal;
  }

  getOrderItem(): OrderItem[] {
    let orderItems: OrderItem[] = [];
    this.cartList$.subscribe((carts) => {
      carts.map((v, i) => {
        let orderItem: OrderItem = {
          OrderId : 1,
          OrderItemId : i,
          Price : v.Price,
          ProductId : v.ProductId,
          ProductName : v.ProductName,
          Quantity : v.Quantity,
          Total : v.Quantity * v.Price
        };
        orderItems.push(orderItem);
      });
    });

    return orderItems;
  }
}
