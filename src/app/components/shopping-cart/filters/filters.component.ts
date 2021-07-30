import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';
import * as kafka from "no-kafka";
import { DataHandler } from 'no-kafka';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  consumer = new kafka.SimpleConsumer({groupId : 'test'});

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

    // this.consumer.subscribe('test', 0, {}, {
      
    // } as DataHandler).then(res=>{
    //   console.log(res);
    // })
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
