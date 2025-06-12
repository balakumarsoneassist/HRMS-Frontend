import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { StatusCodeDataModel } from '../model/StatusCode/statuscode';
import { Subscription } from 'rxjs';
import { BankService } from '../services/bank/bank.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { ReturnStatement } from '@angular/compiler';
import { TrackIdModel } from '../model/lead/lead-model';
import { transition } from '@angular/animations';
import { LoaderService } from "../services/loader/loader.service";
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TagInputComponent, TagInputModule } from 'ngx-chips';

@Component({
    imports:[CommonModule,FormsModule,CalendarModule,TagInputModule],
    standalone: true,
  selector: 'app-lead-follow-up-form',
  templateUrl: './lead-follow-up-form.component.html',
  styleUrls: ['./lead-follow-up-form.component.css']
})
export class LeadFollowUpFormComponent implements OnInit {
LeadId!:number;
StatusCode:any;
model: LeadFollowUp;
trackParmeter:TrackIdModel;
BankList:any;
tagInputList: any[] = [];
loadSpin:number = 0;


  constructor(private service: ContactService,private _objBankService:BankService,private _leadTrackService:LeadtrackService, public loaderService: LoaderService) {
    this.model = new LeadFollowUp();
    this.trackParmeter=new TrackIdModel;

    this.accodianClickSubscription =  this.service.getStatusAcco().subscribe(()=> {
      let model = document.querySelector('.leadInputModel') as HTMLElement;
      // if(model.hasAttribute('.style ')) {
      this.accodianOpen();
    // }
      });
  }

  ngOnInit(): void {
    this.GetBankNameList();
    this.service.LeadTrackIdObservable.subscribe(response=>{
      this.GetLeadTrack(response);
      //console.log("pu..." + response)
    })
this.SetStatus();
   // this.StatusCode= this.model.Status === 2 || this.model.Status === 3 ? StatusCodeDataModel.ContactStatusDataModel : StatusCodeDataModel.LeadStatusDataModel;
    // this.accodianOpen();
  }
  accodianClickSubscription: Subscription;
  IsValid=false;
  currentDateTime: any = new Date();
  accodianOpen() {

    setTimeout( () => {

      let model = document.querySelector('.leadInputModel') as HTMLElement;
     if (this.model.Status != null){
    switch(this.model.Status.toString()) {
        case '3':
          let accodian = document.querySelector('.followingAccodian') as HTMLElement;
          let panel :any = accodian.nextElementSibling;
          if(!panel.hasAttribute('style') || panel.getAttributeNode('style').value == "") {
            accodian.click();
          }
        break;

        case '12':
          let docAccodian :any = document.querySelector('.docAccodian') as HTMLElement;
          let docPanel :any = docAccodian.nextElementSibling;
          if(!docPanel.hasAttribute('style') || docPanel.getAttributeNode('style').value == "") {
            docAccodian.click();
          }
        break;

        case '13':
          let fileAccodian = document.querySelector('.fileLoginAccodian') as HTMLElement;
          let filePanel :any = fileAccodian.nextElementSibling;
          if(!filePanel.hasAttribute('style') || filePanel.getAttributeNode('style').value == "") {
            fileAccodian.click();
          }
        break;

        case '15':
          let santionAccodian = document.querySelector('.sanctionAccodian') as HTMLElement;
          let santionPanel : any = santionAccodian.nextElementSibling;
          if(!santionPanel.hasAttribute('style') || santionPanel.getAttributeNode('style').value == "") {
            santionAccodian.click();
          }
        break;

        case '17'://'Disbursement':
          //(document.querySelector('.disbursementAccodian') as HTMLElement).click();
          let disburseAccodian :any = document.querySelector('.disbursementAccodian') as HTMLElement;
          let disbursePanel :any = disburseAccodian.nextElementSibling;
          if(!disbursePanel.hasAttribute('style') || disbursePanel.getAttributeNode('style').value == "") {
            disburseAccodian.click();
          }
        break;
      }
    }
    });
  }

  IsValidTrack()
  {
      if(this.model.Status  !=  5 &&  this.model.Status !=  18)
      {
        if( typeof this.model.AppoinmentDate=='undefined'||this.model.AppoinmentDate==null)
        {
          alert('Enter The Appoinement Date');
          return false;
        }
      }
      if(this.model.Status !=  18){
        if(  typeof this.model.Notes=='undefined'||this.model.Notes==null||this.model.Notes=="")
        {
          alert('Enter The Notes');
          return false;
        }
      }
      return true;
  }
    IsValidLoanPreRequestic()
    {
      if(this.model.Status==4||this.model.Status==12){
        if(  this.model.LoanType==null|| typeof this.model.LoanType=='undefined'||  this.model.LoanType=='')
        {
          alert('Enter The LoanType');
          return false;
        }
        if(  this.model.DesireAmount==null||typeof this.model.DesireAmount=='undefined'|| this.model.DesireAmount==0)
        {
          alert('Enter The DesireLoanAmount');
          return false;
        }
        if(  this.model.Tenure==null||typeof this.model.Tenure=='undefined'|| this.model.Tenure==0)
        {
          alert('Enter The Tenure');
          return false;
        }
      }
      return true;
      }

//   setTimeout (accodianOpen, 2000);
IsValidDataStrength(){

  if(  typeof this.model.DataStrength=='undefined'||this.model.DataStrength==null||this.model.DataStrength=="")
  {
    alert('Pls select Data Strength');
    return false;
  }


return true;
}
SaveLeadTrack(IsClose)
{
  const startTimestamp = +new Date().getTime();
  if(this.IsValidDataStrength()==false){return;}
  if(this.IsValidTrack()==false){return;}
  if(this.IsValidLoanPreRequestic()==false){return;}
  if(this.IsValidOccupation()==false){return;}
  if(this.model.Status==13)
  {
    if(this.IsDocumentCollectionValid()==false){return;}
  }
  if(this.model.Status==15)
  {
    if(this.IsFileLogIn()==false){return;}
  }
  if(this.model.Status==17)
  {
    if(this.IsSanction()==false){return;}
  }
  if(this.model.Status==18)
  {
    if(this.IsDisbursement()==false){return;}
  }
  this.loadSpin = 1;
 // console.log(this.model);
  this.service.SaveLeadTrack(this.model).subscribe(
    response => {
      this.loadSpin = 0;
      const endTimestamp: number = +new Date().getTime();
             // get the difference
             const responseTimes = (endTimestamp - startTimestamp) / 1000;
           //  console.log(`Request took ${responseTimes} ms`);
      if(response == true) {
        this.ResetModel();
        alert(" Request took  " +responseTimes+ " Milliseconds .... Saved Sucessfully");
        this._leadTrackService.LeadListRefresh();
        if(IsClose==true)
        {
          this.closeModel();
        }
         }

    },
    error => alert('Cant Save')
  )
  //this.loadSpin = 0;
}

ResetModel(){
  this.model.AppoinmentDate = new Date();
  this.model.Notes="";
  this.model.Status= 0;
  this.model.DataStrength='';
}
GetLeadTrack(TrackId)
{
 // console.log('pvr***----'+TrackId)
  this.trackParmeter.TrackId=TrackId
  this.service.GetLeadTrack(this.trackParmeter).subscribe(
    response => {  //console.log(response)
        this.model=response[0];
        this.SetStatus();
        if ((typeof this.model.Compcat == "undefined") || (this.model.Compcat == null)){
          this.model.Compcat = "D";
        }

    },
    error => alert('Internal Server Error')
  )
}
closeModel() {
 // this.ResetModel();
  let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
  leadFormModel.removeAttribute('style');
}
GetBankNameList(){
  this._objBankService.GetBankList().subscribe(
    response => {
        this.BankList=response

    },
    error => alert('InternalServer Error')
  )
}
SetStatus(){
if((this.model.Status<4) || (this.model.Status == 22 ))
{
  this.StatusCode=StatusCodeDataModel.ContactStatusDataModel
}
if(this.model.Status==4)
{
  this.StatusCode=StatusCodeDataModel.ApproveStatusDataModel;
}
if(this.model.Status==11)
{
  this.model.Status=12;
  this.StatusCode=StatusCodeDataModel.DocumentCollectStatusDataModel;
}
if(this.model.Status==12)
{
  this.StatusCode=StatusCodeDataModel.DocumentCollectStatusDataModel;
}
if(this.model.Status==13)
{
  this.StatusCode=StatusCodeDataModel.FileLoginDataModel;
}
if(this.model.Status==14)
{
  this.StatusCode=StatusCodeDataModel.FileLoginDataModel;
}
if(this.model.Status==15)
{
  this.StatusCode=StatusCodeDataModel.SanctionDataModel;
}
if(this.model.Status==16)
{
  this.StatusCode=StatusCodeDataModel.SanctionDataModel;

}
if(this.model.Status==17)
{
  this.StatusCode=StatusCodeDataModel.SanctionDataModel;
}
/*if(this.model.Status==17)
{
  this.StatusCode=StatusCodeDataModel.DisbursementDataModel;
}
if(this.model.Status==18)
{
  this.StatusCode=StatusCodeDataModel.CompeletedDataModel;
}
if(this.model.Status==19)
{
  this.StatusCode=StatusCodeDataModel.BankAssignDataModel;
}*/
}
IsDocumentCollectionValid(): any
{

  if(this.model.Status==13)
  {
    if(this.model.LoanType=="Personal Loan")
    {
            if(this.model.IsIdProof==false)
            {
              alert('Please Check Id Proof');
              return false;
            }
            if(this.model.IsAgeProof==false)
            {
              alert('Please Check Age Proof');
              return false;
            }
            if(this.model.IsAddessProof==false)
            {
              alert('Please Check Address Proof');
              return false;
            }
            // if(this.model.IsBankStatement==false)
            // {
            //   alert('Please Check BankStatement');
            //   return false;
            // }
            if(this.model.IsPaySlip==false)
            {
              alert('Please Check PaySlip');
              return false;
            }
            if(this.model.IsForm16==false)
            {
              alert('Please Check Form16');
              return false;
            }
            if(this.model.IsCreditcardStatement==false)
            {
              alert('Please Check CreditCardStatement');
              return false;
            }
            if(this.model.IsExistingLoanTrack==false)
            {
              alert('Please Check ExistLoanTrack');
              return false;
            }
            if(this.model.IsCurrentAccountStatement==false)
            {
              alert('Please Check Current Account Statement');
              return false;
            }
            if(this.model.IsStabilityProof==false)
            {
              alert('Please Check Stability');
              return false;
            }

    }
    if(this.model.LoanType=="Business Loan"){
            if(this.model.IsIdProof==false)
            {
              alert('Please Check Id Proof');
              return false;
            }
            if(this.model.IsAgeProof==false)
            {
              alert('Please Check Age Proof');
              return false;
            }
            if(this.model.IsAddessProof==false)
            {
              alert('Please Check Address Proof');
              return false;
            }
            // if(this.model.IsBankStatement==false)
            // {
            //   alert('Please Check BankStatement');
            //   return false;
            // }
            if(this.model.IsPaySlip==false)
            {
              alert('Please Check PaySlip');
              return false;
            }

            if(this.model.IsForm16==false)
            {
              alert('Please Check Form16');
              return false;
            }
            if(this.model.IsBusinessProof==false)
            {
              alert('Please Check BusinessProof');
              return false;
            }
            if(this.model.IsITR==false)
            {
              alert('Please Check ITR');
              return false;
            }
            if(this.model.IsGstStatement==false)
            {
              alert('Please Check GST Statement');
              return false;
            }
            if(this.model.IsCreditcardStatement==false)
            {
              alert('Please Check Creditcard Statement');
              return false;
            }

            if(this.model.IsExistingLoanTrack==false)
            {
              alert('Please Check ExistLoanTrack');
              return false;
            }

    }
    if(this.model.LoanType=="Auto Loan-New"){
            if(this.model.IsIdProof==false)
            {
              alert('Please Check Id Proof');
              return false;
            }
            if(this.model.IsAgeProof==false)
            {
              alert('Please Check Age Proof');
              return false;
            }
            if(this.model.IsAddessProof==false)
            {
              alert('Please Check Address Proof');
              return false;
            }
            // if(this.model.IsBankStatement==false)
            // {
            //   alert('Please Check BankStatement');
            //   return false;
            // }
            if(this.model.IsPaySlip==false)
            {
              alert('Please Check PaySlip');
              return false;
            }
            if(this.model.IsForm16==false)
            {
              alert('Please Check Form16');
              return false;
            }

            if(this.model.IsCreditcardStatement==false)
            {
              alert('Please Check CreditCardStatement');
              return false;
            }
            if(this.model.IsExistingLoanTrack==false)
            {
              alert('Please Check ExistLoanTrack');
              return false;
            }
            if(this.model.IsCurrentAccountStatement==false)
            {
              alert('Please Check CurrentStatement');
              return false;
            }
            if(this.model.IsStabilityProof==false)
            {
              alert('Please Check Stability Proof');
              return false;
            }
    }
    if(this.model.LoanType=="Auto Loan-Used"){
            if(this.model.IsIdProof==false)
            {
              alert('Please Check Id Proof');
              return false;
            }
            if(this.model.IsAgeProof==false)
            {
              alert('Please Check Age Proof');
              return false;
            }
            if(this.model.IsAddessProof==false)
            {
              alert('Please Check Address Proof');
              return false;
            }
            if(this.model.IsBusinessProof==false)
            {
              alert('Please Check BusinessProof');
              return false;
            }

            if(this.model.IsITR==false)
            {
              alert('Please Check ITR');
              return false;
            }
            if(this.model.IsGstStatement==false)
            {
              alert('Please Check GST');
              return false;
            }
            if(this.model.IsCreditcardStatement==false)
            {
              alert('Please Check CreditCardStatement');
              return false;
            }
            if(this.model.IsExistingLoanTrack==false)
            {
              alert('Please Check ExistLoanTrack');
              return false;
            }
            if(this.model.IsRcBook==false)
            {
              alert('Please Check RC book');
              return false;
            }
            if(this.model.IsCurrentAccountStatement==false)
            {
              alert('Please Check Current Account Statement');
              return false;
            }
            if(this.model.IsStabilityProof==false)
            {
              alert('Please Check Stability Proof');
              return false;
            }
    }
    if(this.model.LoanType=="Jewel Loan"){
              if(this.model.IsIdProof==false)
              {
                alert('Please Check Id Proof');
                return false;
              }
              if(this.model.IsAgeProof==false)
              {
                alert('Please Check Age Proof');
                return false;
              }
              if(this.model.IsAddessProof==false)
              {
                alert('Please Check Address Proof');
                return false;
              }
              // if(this.model.IsBankStatement==false)
              // {
              //   alert('Please Check BankStatement');
              //   return false;
              // }

              if(this.model.IsPaySlip==false)
              {
                alert('Please Check PaySlip');
                return false;
              }
              if(this.model.IsGstStatement==false)
              {
                alert('Please Check GST');
                return false;
              }
              if(this.model.IsForm16==false)
              {
                alert('Please Check Form16');
                return false;
              }
              if(this.model.IsCreditcardStatement==false)
              {
                alert('Please Check CreditCardStatement');
                return false;
              }
              if(this.model.IsExistingLoanTrack==false)
              {
                alert('Please Check ExistLoanTrack');
                return false;
              }
              if(this.model.IsCurrentAccountStatement==false)
              {
                alert('Please Check Current Account Statement');
                return false;
              }
              if(this.model.IsStabilityProof==false)
              {
                alert('Please Check Stability Proof');
                return false;
              }
    }
    if(this.model.LoanType=="LAP")
    {
      if(this.model.IsIdProof==false)
      {
        alert('Please Check Id Proof');
        return false;
      }
      if(this.model.IsAgeProof==false)
      {
        alert('Please Check Age Proof');
        return false;
      }
      if(this.model.IsAddessProof==false)
      {
        alert('Please Check Address Proof');
        return false;
      }
      // if(this.model.IsBankStatement==false)
      // {
      //   alert('Please Check BankStatement');
      //   return false;
      // }

      if(this.model.IsPaySlip==false)
      {
        alert('Please Check PaySlip');
        return false;
      }

      if(this.model.IsForm16==false)
      {
        alert('Please Check Form16');
        return false;
      }
      if(this.model.IsCreditcardStatement==false)
      {
        alert('Please Check CreditCardStatement');
        return false;
      }
      if(this.model.IsExistingLoanTrack==false)
      {
        alert('Please Check ExistLoanTrack');
        return false;
      }
      if(this.model.IsEncumbranceCertificate==false)
      {
        alert('Please Check Current Account EncumbranceCertificate');
        return false;
      }
      if(this.model.IsTitleDeed==false)
      {
        alert('Please Check TittleDeed');
        return false;
      }
      if(this.model.IsParentDeed==false)
      {
        alert('Please Check ParentDeed');
        return false;
      }
      if(this.model.IsLayoutPlan==false)
      {
        alert('Please Check Layout');
        return false;
      }
      // if(this.model.IsRegulationOrder==false)
      // {
      //   alert('Please Check Current Account Regularisation Order');
      //   return false;
      // }
      // if(this.model.IsBuildingPermit==false)
      // {
      //   alert('Please Check Building Permit');
      //   return false;
      // }
      // if(this.model.IsPropertyTax==false)
      // {
      //   alert('Please Check PropertyTax');
      //   return false;
      // }
      // if(this.model.IsPatta==false)
      // {
      //   alert('Please Check Pattta');
      //   return false;
      // }
    }

    if(this.model.LoanType=="Home Loan-Self Construction"
    ||this.model.LoanType=="Home Loan-Resale"||this.model.LoanType=="Home Loan-Builder Purchase"
    ||this.model.LoanType=="Land Loan"||this.model.LoanType=="Land Loan+Construction"||this.model.LoanType=="NRP"){
              if(this.model.IsIdProof==false)
              {
                alert('Please Check Id Proof');
                return false;
              }
              if(this.model.IsAgeProof==false)
              {
                alert('Please Check Age Proof');
                return false;
              }
              if(this.model.IsAddessProof==false)
              {
                alert('Please Check Address Proof');
                return false;
              }
              // if(this.model.IsBankStatement==false)
              // {
              //   alert('Please Check BankStatement');
              //   return false;
              // }

              if(this.model.IsPaySlip==false)
              {
                alert('Please Check PaySlip');
                return false;
              }

              if(this.model.IsForm16==false)
              {
                alert('Please Check Form16');
                return false;
              }
              if(this.model.IsCreditcardStatement==false)
              {
                alert('Please Check CreditCardStatement');
                return false;
              }
              if(this.model.IsExistingLoanTrack==false)
              {
                alert('Please Check ExistLoanTrack');
                return false;
              }
              if(this.model.IsEncumbranceCertificate==false)
              {
                alert('Please Check  EncumbranceCertificate');
                return false;
              }
              if(this.model.IsTitleDeed==false)
              {
                alert('Please Check TittleDeed');
                return false;
              }
              if(this.model.IsParentDeed==false)
              {
                alert('Please Check ParentDeed');
                return false;
              }
              if(this.model.IsLayoutPlan==false)
              {
                alert('Please Check Layout');
                return false;
              }
              // if(this.model.LoanType=="Land Loan")
              // {
              //   if(this.model.IsSaleAgreement==false)
              //   {
              //     alert('Please Check Sales Agereement');
              //     return false;
              //   }
              //   if(this.model.IsApf==false)
              //   {
              //     alert('Please Check Apf');
              //     return false;
              //   }
              // }
              // if(this.model.LoanType=="Land Loan+Construction")
              // {
              //   if(this.model.IsConstructionAgreement==false)
              //   {
              //     alert('Please Construction');
              //     return false;
              //   }
              //   if(this.model.IsApf==false)
              //   {
              //     alert('Please Check Apf');
              //     return false;
              //   }
              // }
              // if(this.model.LoanType=="NRP")
              // {
              //   if(this.model.IsUdsRegistration==false)
              //   {
              //     alert('Please check USD Registration');
              //     return false;
              //   }

              // }
    }//Both Are Same
    if(this.model.LoanType=="Commercial Vehicle Loan-Used"||this.model.LoanType=="Commercial Vehicle Loan-New"){
                if(this.model.IsIdProof==false)
                {
                  alert('Please Check Id Proof');
                  return false;
                }
                if(this.model.IsAgeProof==false)
                {
                  alert('Please Check Age Proof');
                  return false;
                }
                if(this.model.IsAddessProof==false)
                {
                  alert('Please Check Address Proof');
                  return false;
                }
                if(this.model.IsCreditcardStatement==false)
                {
                  alert('Please Check CreditCardStatement');
                  return false;
                }
                if(this.model.IsExistingLoanTrack==false)
                {
                  alert('Please Check ExistLoanTrack');
                  return false;
                }
                if(this.model.IsCurrentAccountStatement==false)
                {
                  alert('Please Check Current Account Statement');
                  return false;
                }
                if(this.model.IsStabilityProof==false)
                {
                  alert('Please Check Stability Proof');
                  return false;
                }
    }
  }

}
IsFileLogIn(): boolean {
  if (!this.model.BankName) {
    alert('Enter The BankName');
    return false;
  }
  if (!this.model.ApplicationNumber) {
    alert('Enter The ApplicationNumber');
    return false;
  }
  if (!this.model.LoginDate) {
    alert('Enter The Login Date');
    return false;
  }
  if (!this.model.LoginValue || this.model.LoginValue == 0) {
    alert('Enter The Login Value');
    return false;
  }
  return true;
}

IsSanction(): boolean {
  if (!this.model.SanctionROI) {
    alert('Enter The Sanction ROI');
    return false;
  }
  if (!this.model.SanctionTenure) {
    alert('Enter The Sanction Tenure');
    return false;
  }
  if (!this.model.SanctionValue) {
    alert('Enter The Sanction Value');
    return false;
  }
  if (!this.model.SanctionDate) {
    alert('Enter The Sanction Date');
    return false;
  }
  if (!Array.isArray(this.model.PsdCondition) || this.model.PsdCondition.length === 0) {
    alert('Enter The PSD Condition');
    return false;
  }
  return true;
}

IsDisbursement(): boolean {
  if (!this.model.IsLegal) {
    alert('Please check Legal Condition');
    return false;
  }
  if (!this.model.IsTechnical) {
    alert('Please check Technical Condition');
    return false;
  }
  return true;
}

IsValidOccupation(): boolean {
  if (this.model.Status >= 12 && this.model.Status <= 18) {
    if (!this.model.OccupationType) {
      alert('Enter The Occupation Type');
      return false;
    }
    if (!this.model.IncomeType) {
      alert('Enter The Income Type');
      return false;
    }
    if (!this.model.IncomeAmount || this.model.IncomeAmount == 0) {
      alert('Enter The Income Amount');
      return false;
    }
  }
  return true;
}

Onblurincome(ev: any) { // Angular 13

 // alert(this.model.IncomeAmount);
  //this.model.Compcat = "C";
  //alert(this.model.Compcat);

     // alert('l');
      if (this.model.IncomeAmount == 0){
          if (this.model.Compcat == '') {
            this.model.Custsegment = "Open";
          }
      }
      else if (this.model.IncomeAmount >= 100000){
        //if (this.model.Compcat == 'A') {
    //      alert('above 10k-r-')
          this.model.Custsegment = "Royal";
        //}
      }
      else if ((this.model.IncomeAmount >= 75000) &&(this.model.IncomeAmount < 100000)){
        if (this.model.Compcat == 'A') {
   //       alert('above 75k-100k-p-')
          this.model.Custsegment = "Premium";
        }
      }

      if ((this.model.IncomeAmount >= 60000) &&(this.model.IncomeAmount < 100000)){
        if (this.model.Compcat != 'A') {
     //     alert('above 60k-bcd-')
          this.model.Custsegment = "Premium";
        }
      }
      else if (this.model.IncomeAmount >= 40000) {
        if (this.model.Compcat == 'A')
        {
      //    alert('above 40k-75k-g-')
          if (this.model.IncomeAmount < 75000)
          {
            this.model.Custsegment = "Gold";
          }
        }
        else {
          if (this.model.IncomeAmount < 60000)
          {
            this.model.Custsegment = "Gold";
          }
        }
      }


      else {
      //  alert('gfg')
          this.model.Custsegment = "Open";
        }


//   if (this.StatusList!= null) {
//   this.StatusList.forEach(x => x.checkstatus = ev.target.checked)
//   //alert(ev.target.checked)
//   this.processChecked(ev.target.checked);
// }
}

Onchangecc(ev: any) { // Angular 13

 // alert(this.model.Compcat);
  //this.model.Compcat = "C";


 if (this.model.IncomeAmount >= 100000){
    //if (this.model.Compcat == 'A') {
  //      alert('above 10k-r-')
      this.model.Custsegment = "Royal";
    //}
  }
  else if ((this.model.IncomeAmount >= 75000) &&(this.model.IncomeAmount < 100000)){
    if (this.model.Compcat == 'A') {
  //       alert('above 75k-100k-p-')
      this.model.Custsegment = "Premium";
    }
  }

  if ((this.model.IncomeAmount >= 60000) &&(this.model.IncomeAmount < 100000)){
    if (this.model.Compcat != 'A') {
  //     alert('above 60k-bcd-')
      this.model.Custsegment = "Premium";
    }
  }
  else if (this.model.IncomeAmount >= 40000) {
    if (this.model.Compcat == 'A')
    {
  //    alert('above 40k-75k-g-')
      if (this.model.IncomeAmount < 75000)
      {
        this.model.Custsegment = "Gold";
      }
    }
    else {
      if (this.model.IncomeAmount < 60000)
      {
        this.model.Custsegment = "Gold";
      }
    }
  }


  else {
  //  alert('gfg')
      this.model.Custsegment = "Open";
    }

//   if (this.StatusList!= null) {
//   this.StatusList.forEach(x => x.checkstatus = ev.target.checked)
//   //alert(ev.target.checked)
//   this.processChecked(ev.target.checked);
// }
}
}
