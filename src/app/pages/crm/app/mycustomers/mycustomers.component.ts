import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { ExtCustomerService } from '../services/extcustomer/extcustomer.service';
import { TrackExtCust } from '../model/extcustomer/extcustomer';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";
import { CustomertrackComponent } from "../customertrack/customertrack.component";
import { CustservicetrackComponent } from "../custservicetrack/custservicetrack.component";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, SearchpipePipe, CustomertrackComponent, CustservicetrackComponent],
  selector: 'app-mycustomers',
  templateUrl: './mycustomers.component.html',
  styleUrls: ['./mycustomers.component.css']
})
export class MycustomersComponent implements OnInit {
  CustList: any;
  StatusType:string = "";
  searchStr:string;
  paraModel:TrackExtCust =  new TrackExtCust;
  constructor(private _objRepService:CustomerService, private _objExtService: ExtCustomerService, private _objCusttrackservice: CustomertrackService ) {
    this.searchStr = "";
  }
  statusFilter: any
  ngOnInit(): void {
    this.GetCustomerList();
  }

  GetCustomerList() {
    this._objRepService.getAssignedCustomerList().subscribe(
      response => {
        this.CustList = response

        console.log(response)
        console.log('Customer list')

      },
      error => alert('InternalServer Error')
    )
  }
  OpenCustomerTrack(Id:number, trackno:string){
    let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    customerModel.style.display = "flex";
    this._objCusttrackservice.SendCustomerid(Id);
//    console.log(trackno);
    this._objCusttrackservice.SendCustomerTrack(trackno);
  }
/*

  callStatus(Id,TrackNumber) {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    this.contactService.statusOpeningAcco();
    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackNumber);
  }
*/

callStatus(Id:number,name:string,mno:string) {
  if (Id == null){Id=0;}
  console.log(Id)
  var tmp = Id + '**' + name + '**' + mno;
  let customerModel1 = document.querySelector('.callHistoryModel1') as HTMLInputElement;
 // alert(customerModel1)
  customerModel1.style.display = "flex";
  this._objCusttrackservice.statusOpeningAcco();
  this._objCusttrackservice.SendCustId(tmp);
}
}
