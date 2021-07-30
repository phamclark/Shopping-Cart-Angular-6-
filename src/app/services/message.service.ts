import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  subject =  new Subject();
  subjectFilter = new Subject();
  constructor() { }

  sendMsg(product: Product) {
    this.subject.next(product); // Triggering an event
  }

  getMsg() {
    return this.subject.asObservable();
  }

  sendMsgFilter({}) {
    this.subjectFilter.next({}); // Triggering an event update filter
  }

  getMsgFilter() {
    return this.subjectFilter.asObservable();
  }
}
