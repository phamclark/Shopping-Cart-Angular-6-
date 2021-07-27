import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList$: Observable<Cart[]>;
  deleteCartItem$ = new Subject<Cart>();
  constructor() { }
}
