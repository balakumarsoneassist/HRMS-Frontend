import { Component, OnInit } from '@angular/core';


import { SalesVisitService } from '../services/salesvisit/salesvisit.service';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesvisitComponent } from "../salesvisit/salesvisit.component";
import { CustomerextComponent } from "../customerext/customerext.component";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, SalesvisitComponent, CustomerextComponent],
  selector: 'app-svcustomer-followup',
  templateUrl: './svcustomer-followup.component.html',
  styleUrls: ['./svcustomer-followup.component.css']
})
export class SvcustomerFollowupComponent implements OnInit {
  SVcustomerList:any;


  constructor(private _objSVService:SalesVisitService) {

   }

  ngOnInit(): void {
    this.GetCustomerList();
  }

  // callStatus(Id) {
  //   let customerModel = document.querySelector('.leadInputModel') as HTMLInputElement;
  //   customerModel.style.display = "flex";
  //   this._objSVService.statusOpeningAcco();
  //   this._objSVService.SendCustId(Id);

  // }

  callStatus(Id:number,name:string,mno:string) {
    if (Id == null){Id=0;}
    console.log(Id)
    var tmp = Id + '**' + name + '**' + mno;
    let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    customerModel.style.display = "flex";
    this._objSVService.statusOpeningAcco();
    this._objSVService.SendCustId(tmp);
  }

  CloseCustomerModel() {
    let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    customerModel.removeAttribute('style');
  }


  GetCustomerList(){

    this._objSVService.GetSVcustomerlist().subscribe(
      response => {
        this.SVcustomerList = response;

      })
  }



}
