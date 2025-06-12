import { Component, OnInit } from '@angular/core';

import {  FormBuilder, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../model/employee/employee';
import { ContactService } from '../services/contact/contact.service';
import { CardCountModel } from '../model/common/cardcnt';
import { OurbankService } from '../services/ourbank/ourbank.service';
import { OurBankDiff } from '../model/ourbank/ourbank';
import { OurBankMasterModel } from '../model/ourbank/ourbank';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";
import { AddOurbankFormComponent } from "../add-ourbank-form/add-ourbank-form.component";
import { OnreviewComponent } from "../onreview/onreview.component";
import { UnTrackContactComponent } from "../un-track-contact/un-track-contact.component";
import { OnTrackContactComponent } from "../on-track-contact/on-track-contact.component";
import { OnTrackLeadComponent } from "../on-track-lead/on-track-lead.component";
import { UnTrackLeadComponent } from "../un-track-lead/un-track-lead.component";


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, RouterOutlet, LeadFormModelComponent, AddOurbankFormComponent, OnreviewComponent, UnTrackContactComponent, OnTrackContactComponent, OnTrackLeadComponent, UnTrackLeadComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  objEmployeeModel:Employee;
  cardcount:CardCountModel = {} as CardCountModel;
  RejectedCardContent:any;
  notRespondCardContent:any;
  callsCardContent:any;
  followUpCardContent:any;
  leadCardContent:any;
  DayDiffList!:OurBankDiff[];
  hideOurBank:boolean = false;
  OurbModel!:OurBankMasterModel[];
  hideOurbankDetails:boolean = true;
  hideViewBankList:boolean = false;
  hidehBankList:boolean = true;
  constructor(private _objEmplyeeService:EmployeeService,private _objcontactService:ContactService,private _objOurBankService:OurbankService) {
  this.objEmployeeModel=new Employee();

  }
  ngOnInit(): void {
    this.GetUserRights();
    this.CheckUserRights();
    this.cardcount.AttendCallDayCount = 0;
    this.cardcount.AttendCallMonthCount = 0;
    this.cardcount.PendingCallDayCount = 0;
    this.cardcount.PendingCallMonthCount = 0;
    this.cardcount.RejectCallDayCount =0;
    this.cardcount.RejectCallMonthCount = 0;
    this.cardcount.TotalCallDayCount =0;
    this.cardcount.TotalCallMonthCount =0;
    this.cardcount.TotalLeadDayCount = 0;
    this.cardcount.TotalLeadMonthCount = 0;
    //this.getcontactcard();
    this.GetOurbankDiff();
        }
  GetUserRights(){
    this._objEmplyeeService.GetEmployeeRights().subscribe(
      response=>{

        this.objEmployeeModel=response[0];

      },
      error=>alert('Internal Server Error - Emp rights')
    )
  }

  CheckUserRights(){
    console.log(this.objEmployeeModel)
    if (this.objEmployeeModel.IsAdminRights){
      this.hideOurBank = false;
    }
    else{
      this.hideOurBank = true;
    }
  }
  getcontactcard(){
    this._objcontactService.Getcardcontact().subscribe(
      response => {
        this.cardcount=response[0];
        console.log(this.cardcount)
      },
      error => alert('Internel Server Error - Card count')
    )
  }

  GetOurbankDiff(){
    this._objOurBankService.GetOurBankDiffList().subscribe(
      response => {
          this.DayDiffList=response
          console.log(response)

      },
      error => alert('InternalServer Error')
    )
  }

  OpenBankNetworkDetails(){
    this.hideOurbankDetails = false;
    this.hideViewBankList = true;
    this.hidehBankList = false;
    this.GetOurBankDetails();
  }

  CloseBankNetworkDetails(){
    this.hideViewBankList = false;
    this.hidehBankList = true;
    this.hideOurbankDetails = true;
  }

  GetOurBankDetails(){
    this._objOurBankService.GetOurBankList().subscribe(
      response => {
          this.OurbModel=response
          console.log(response)

      },
      error => alert('InternalServer Error')
    )

  }

  closeModel1() {
    let cibilReportModel = document.querySelector('.cibilReportModel1') as HTMLInputElement;
    cibilReportModel.removeAttribute('style');
  }
  editOurBank(Id:any){
    let cibilReportModel = document.querySelector('.cibilReportModel1') as HTMLInputElement;
    cibilReportModel.style.display="flex";

    this._objOurBankService.SendOurBankId(Id);
  }

  AddourBank(){
    let cibilReportModel = document.querySelector('.cibilReportModel1') as HTMLInputElement;
    cibilReportModel.style.display="flex";
    this._objOurBankService.SendOurBankId(0);
  }



  homeComponents = "OnReview";
    date;
    notes;
    loanType;
    desireLoanAmount;
    preferedBank;
    cibilScore;
    incomeCheck;
    idProof;
    addressProof;
}

