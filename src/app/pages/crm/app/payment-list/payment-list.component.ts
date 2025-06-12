import { Component, OnInit} from '@angular/core';
import { PaginationModel } from '../model/Contact/ContactModel';
import { connecterService } from '../services/connector/connecterService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports:[CommonModule,FormsModule],
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  paginationModel:PaginationModel;
  paymentList:any;
  constructor(private objConnectorService:connecterService) {
    this.paginationModel=new PaginationModel
  }
  // all  = [

  //   {

  //     name:'',
  //     checked: false
  //   },


  // ];
  // selected = [
  //   {

  //     name:''
  //   },

  // ];

  // getSel() {
  //   for(let i=0;i<this.selected.length; i++){
  //     for(let j=0;j<this.all.length;j++){
  //       if(this.all[j].name === this.selected[i].name) {
  //         this.all[j].checked = true;
  //       }
  //     }
  //   }
  // }


  ngOnInit(): void {
    this.getPaymentList();
  }
  getPaymentList(){
    this.paginationModel.PageNumber=0;
    this.objConnectorService.getPaymentList(this.paginationModel).subscribe(
      response => {
          this.paymentList=response
      },
      error => alert('Internal Server Error')
    )
  }
  updateConnectorPayment(Id)
  {
    this.paginationModel.PageNumber=0;
    this.objConnectorService.updateConnectorPayment(Id).subscribe(
      response => {
         if(response==true)
         {
           alert('Payment Update Successfully');
           this.getPaymentList();
         }
      },
      error => alert('Internal Server Error')
    )
  }
}
