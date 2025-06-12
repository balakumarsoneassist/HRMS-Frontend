import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { ExtCustomerService } from '../services/extcustomer/extcustomer.service';
import { TrackExtCust } from '../model/extcustomer/extcustomer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerextComponent } from "../customerext/customerext.component";
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, CustomerextComponent, SearchpipePipe],
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  CustList: any;
  StatusType:string = "";
  searchStr:string;
  paraModel:TrackExtCust =  new TrackExtCust;
  constructor(private _objRepService:CustomerService, private _objExtService: ExtCustomerService ) {
    this.searchStr = "";
  }
  statusFilter: any
  ngOnInit(): void {
    this.GetCustomerList();
  }

  GetCustomerList() {
    this._objRepService.getCustomerList().subscribe(
      response => {
        this.CustList = response

        console.log(response)
        console.log('Customer list')

      },
      error => alert('InternalServer Error')
    )
  }

  OpenCustomerModel(Id:number) {
    if (Id == null){Id=0;}
    console.log(Id)
    let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    customerModel.style.display = "flex";
   // this.contactSevice.SendLeadTrack(TrackNumber);
   this._objExtService.SendExtCustomer(Id);
  }
  CloseCustomerModel() {
    let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    customerModel.removeAttribute('style');
  }



  AssignedTo(Id:number)
      {
        //console.log(Id + "----pv")
        this.paraModel.Id = Id;


        this._objExtService.AssignCustomerToEmp(this.paraModel).subscribe(
          response=>{
                        if(response==true)
                        {
                          alert('Lead Assigned Successfully');
                          this.GetCustomerList();
                        }
                    },
          error =>alert('InternalServer Error')
        )
      }

}
