import { Component, OnInit, Input } from '@angular/core';
import { LeadModel, OccupationModel } from '../model/lead/lead-model';
import { LeadService } from '../services/lead/lead.service';
import { ContactService } from '../services/contact/contact.service';
import { BankService } from '../services/bank/bank.service';
import { Observable } from 'rxjs';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { formatDate } from '@angular/common';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { LocationServiceService } from '../services/location/location-service.service';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports:[CommonModule,FormsModule,CalendarModule],
  selector: 'app-lead-detail-form',
  templateUrl: './lead-detail-form.component.html',
  styleUrls: ['./lead-detail-form.component.css']
})
export class LeadDetailFormComponent implements OnInit {
  model: LeadModel | any;
  _objOccupationModel:OccupationModel | undefined
  BankList:any;
  LocationList!:any[];
  @Input() isSaveAndClose!: boolean;
  constructor(
    private leadService: LeadService,
    private contactSevice:ContactService,
    private _objBankService:BankService,
    private _objLeadTrackService:LeadtrackService,
    private objLocationService:LocationServiceService
    ) {
    this.model = new LeadModel();
  }

  ngOnInit(): void {
  this.GetLocationList();
    this.contactSevice.leadSendObservable.subscribe(response=>{
      this.GetLeadPersonalDetails(response);
    })
    this.GetBankNameList();
      /* accodian - start */
    let acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
       acc[i].addEventListener("click", (event: Event) => {
  const target = event.currentTarget as HTMLElement;
  target.classList.toggle("active");
  const panel :any = target.nextElementSibling as HTMLElement;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
});


    }
    /* accodian - end */
  }

  addFormGroup() {
    this.model.OccupationDetails.push({Occupation:"", CompanyName: "", CompanyAddress: "", Designation:"", JoiningDate: "", OfficeTelNo: "", CompanyGSTIN: "", Income: "", OtherIncome: ""});
    setTimeout(function () {
        let panel = document.querySelector(".occupationPanel") as HTMLInputElement;
        let overFlow = document.querySelector(".occupationPanelOverFlow") as HTMLInputElement;
        panel.style.maxHeight = overFlow.scrollHeight + "px";
    });
  }

  deleteFormGroup(index: number) {
    this.model.OccupationDetails.splice(index, 1);
  }

  addBankRow() {
    this.model.BankDetails.push({BankName: "", Branch: "", IfscCode: "", AccNo: ""});
    setTimeout(function () {
        let panel = document.querySelector(".bankPanel") as HTMLInputElement;
        let overFlow = document.querySelector(".bankPanelOverFlow") as HTMLInputElement;
        panel.style.maxHeight = overFlow.scrollHeight + "px";
    });
  }

  deleteBankRow(index: number) {
    this.model.BankDetails.splice(index, 1);
  }

  addLoanRow() {
    this.model.LoanHistory.push({LoanType: "", LoanAmount: "", Bank: "", Branch: "", Tenure: "", SantionDate: ""});
    setTimeout(function () {
        let panel = document.querySelector(".loanPanel") as HTMLInputElement;
        let overFlow = document.querySelector(".loanPanelOverFlow") as HTMLInputElement;
        panel.style.maxHeight = overFlow.scrollHeight + "px";
    });
  }

  deleteLoanRow(index: number) {
    this.model.LoanHistory.splice(index, 1);
    // setTimeout(function () {
    // let panel = document.querySelector(".loanPanel") as HTMLInputElement;
    // let overFlow = document.querySelector(".loanPanelOverFlow") as HTMLInputElement;
    // console.log(overFlow.scrollHeight)
    // panel.style.maxHeight = overFlow.scrollHeight + "px";
    // });
  }
  LeadPersonalDetailSubmit(IsClose) {
    if(this.IsValidPersonalDetails()==false)
    {
      return;
    }
    if(this.IsOccupationValid()==false)
    {
      return;
    }
    if(this.IsBankDetailValid()==false)
    {
      return;
    }
    // if(this.IsLoanDetailValid()==false)
    // {
    //   alert('Enter the Valid Loan Details');
    //   return;
    // }
    // var displayName=this.model.FirstName;
    this.leadService.saveLeadPersonalDetails(this.model).subscribe(
      response => {
        if(response == true) {
        alert("Saved Sucessfully");
        this._objLeadTrackService.LeadListRefresh();
        if(IsClose==true)
        {
          this.closeModel();
        }
        this.model=null;
         }
      },
      error => alert('Cant Save')
    )
  }

  GetLeadPersonalDetails(Id)
  {
    this.leadService.GetLeadPersonalDetails(Id).subscribe(
      response => {
        this.model=response[0];
        if(this.model.OccupationDetails.length==0)
        {
           this.addFormGroup();
        }
        if(this.model.LoanHistory.length==0)
        {
          this.addLoanRow();
        }
        if(this.model.BankDetails.length==0)
        {
          this.addBankRow();
        }
      },
      error => alert('InternalSever Error')
    )
  }
  GetLeadOccupationDetails(Id)
  {
    this.leadService.GetLeadOccupationDetails(Id).subscribe(
      response => {
      },
      error => alert('InternalSever Error')
    )
  }
  GetBankNameList(){
    this._objBankService.GetBankList().subscribe(
      response => {
          this.BankList=response;
      },
      error => alert('InternalServer Error')
    )
  }
  closeModel() {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.removeAttribute('style');
  }


 IsBankDetailValid(): boolean {
  if (this.model.BankDetails.length > 0) {
    for (let i = 0; i < this.model.BankDetails.length; i++) {
      const detail = this.model.BankDetails[i];
      if (!detail.BankName) {
        alert('Enter the BankName');
        return false;
      }
    }
  }
  return true; // <-- added return value
}

 IsLoanDetailValid(): boolean {
  if (this.model.LoanHistory.length > 0) {
    for (let i = 0; i < this.model.LoanHistory.length; i++) {
      const loan = this.model.LoanHistory[i];
      if (!loan.LoanType || !loan.LoanAmount || !loan.BranchName || !loan.Tenure || !loan.SanctionDate || !loan.ROI) {
        return false;
      }
    }
  }
  return true; // <-- added return value
}


  IsOccupationValid(): boolean {
  for (let i = 0; i < this.model.OccupationDetails.length; i++) {
    const occ = this.model.OccupationDetails[i];
    if (!occ.Occupation) {
      alert('Enter the Occupation');
      return false;
    }
    if (!occ.IncomeAmount) {
      alert('Enter the Income Amount');
      return false;
    }
    if (!occ.IncomeType) {
      alert('Enter the Income type');
      return false;
    }
  }
  return true; // <-- added return value
}

 IsValidPersonalDetails(): boolean {
  if (!this.model.FirstName) {
    alert('Enter the first Name');
    return false;
  }
  if (!this.model.LastName) {
    alert('Enter the Last Name');
    return false;
  }
  if (!this.model.MobileNumber) {
    alert('Enter the Mobile Number');
    return false;
  }
  if (!this.model.Email) {
    alert('Enter the Email');
    return false;
  }
  if (!this.model.LocationId) {
    alert('Enter the Location');
    return false;
  }
  return true; // <-- added return value
}

  GetLocationList(){
    this.objLocationService.GetLocationList().subscribe(
      response=>{
        this.LocationList=response;
      },
      error=>alert('Internal Server Error'+error)
    )
  }

}



