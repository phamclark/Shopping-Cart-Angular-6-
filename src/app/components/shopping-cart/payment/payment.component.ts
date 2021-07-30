import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { BaseResponse } from 'src/app/models/baseResponse.model';
import { Payment } from 'src/app/models/payment.model';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isFormValid : boolean;
  paymentFormData : Payment;
  private config: MatSnackBarConfig;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PaymentComponent>,
    public cartService: CartService,
    public snackBar : MatSnackBar,
  ) { 
    this.config = new MatSnackBarConfig();
    this.config.duration = 2000;
  }

  ngOnInit() {
    this.resetPaymentForm();
  }
  resetPaymentForm(){
    this.paymentFormData = {
      Name : '',
      Phone : '',
      Address :'',
      CreaditCard : '0000 0000 0000 0000',
      Year: 1,
      Month: 2021,
      CVV: 123
    }
  }
  showSnackbar(message: string, duration?: number, action?: string) {
    this.config = duration ? Object.assign(this.config, { 'duration': duration,  'verticalPosition': 'top', 'panelClass' :'showSnackbar' }) : this.config;
    this.snackBar.open(message, action, this.config);
  }
  submitOrder(){
    if(this.validateForm()){
      this.cartService.addOrder().then((resp: BaseResponse) => {
        if (resp.success == true) {
          this.showSnackbar('Order Sent Successfully...',3000);
          this.cartService.completeOrder = true;
          this.dialogRef.close();
        }
      });
    }
     
  }

  validateForm(){
    debugger
    if(this.paymentFormData.Name.length === 0 || 
      this.paymentFormData.Address.length === 0 || 
      this.paymentFormData.Phone.length === 0){
        this.isFormValid = false;
    }
    else{
      this.isFormValid = true;
    }
    return this.isFormValid;
  }
}
