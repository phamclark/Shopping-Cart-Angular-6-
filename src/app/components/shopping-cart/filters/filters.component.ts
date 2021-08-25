import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(
    public service: ProductService,
    public msgService: MessageService
  ) { }

  ngOnInit() {
    this.InitForm();
  }

  InitForm(form?: NgForm) {
    this.service.formFilter = {
      ProductName: '',
      FromPrice: 1,
      ToPrice : 500
    };
  }

  onSubmit() {
    this.msgService.sendMsgFilter({});
  }

  resetFilter() {
    this.InitForm();
    this.msgService.sendMsgFilter({});
  }

  dataHandler(messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
    });
};
}
