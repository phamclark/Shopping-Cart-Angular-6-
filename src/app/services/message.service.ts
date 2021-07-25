import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  subject =  new Subject();
  subjectWishlist = new Subject();
  constructor() { }
  
  sendMsg(product: Product){
    debugger
    this.subject.next(product) //Triggering an event
  }

  getMsg(){
    return this.subject.asObservable();
  }

  sendMsgWishlist(product: Product){
    debugger
    this.subjectWishlist.next(product) //Triggering an event add or remove wishlist
  }

  getMsgWishlist(){
    return this.subjectWishlist.asObservable();
  }
}
