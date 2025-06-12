import { Component, OnInit } from '@angular/core';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { Servicefreq } from '../model/extcustomer/extcustomer';

import { EmployeeService } from '../services/employee/employee.service';

import { Employee } from '../model/employee/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustservicetrackHistoryComponent } from "../custservicetrack-history/custservicetrack-history.component";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, CustservicetrackHistoryComponent],
  selector: 'app-custservicecall-freq',
  templateUrl: './custservicecall-freq.component.html',
  styleUrls: ['./custservicecall-freq.component.css']
})
export class CustservicecallFreqComponent implements OnInit {

  CustomerTrackList:any;
  trackForm:Servicefreq = new Servicefreq();
  objEmployeeModel!: Employee;
  adminRights:any;

  constructor(private objCustSer:CustomertrackService,private objEmpService:EmployeeService) { }

  ngOnInit(): void {
    this.GetUserRights();
  }

  GetServiceCallFreqList()
  {
console.log(this.trackForm);
  this.objCustSer.GetServiceCallfreq(this.trackForm).subscribe(
    response => {
 //     console.log(response)
        this.CustomerTrackList=response;
    },
    error => alert('Internal Server Error')
  )
  }

  GetUserRights() {
    this.objEmpService.GetEmployeeRights().subscribe(
      response => {
        this.objEmployeeModel = response[0];
      //  console.log(this.objEmployeeModel);
        this.checkSplRights();
      },
      error => alert('Internal Server Error')
    )
  }

  checkSplRights(){
    this.adminRights = this.objEmployeeModel.IsAdminRights;
  //  console.log(this.adminRights)
    if(this.adminRights) {

      this.trackForm.usertype = 'admin';
    }
    else {
      this.trackForm.usertype = 'others';
    }
    this.GetServiceCallFreqList();
  }

  closeModel() {
    //let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    let customerModel = document.querySelector('.callHistoryModel1') as HTMLInputElement;
   // customerModel.style.display = "flex";
    //leadFormModel.removeAttribute('style');
    customerModel.removeAttribute('style');
  }


  callStatus(Id:number,name:string,mno:string) {
    if (Id == null){Id=0;}
   // console.log(Id)
    var tmp = Id + '**' + name + '**' + mno;
    let customerModel1 = document.querySelector('.callHistoryModel1') as HTMLInputElement;
   // alert(customerModel1)
    customerModel1.style.display = "flex";
    this.objCustSer.statusOpeningAcco();
    this.objCustSer.SendCustId(tmp);
  }
}
