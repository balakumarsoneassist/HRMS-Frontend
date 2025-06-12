import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CibilService } from '../services/cibil/cibil.service';
import { Cibilreport } from '../model/cibilreport/cibilreport';
import { FormsModule, NgModel } from '@angular/forms';
import { Cibil } from '../model/cibil/cibil';
import { CommonModule } from '@angular/common';


@Component({
     standalone: true,
  imports:[CommonModule,FormsModule],
  selector: 'app-cibil-report',
  templateUrl: './cibil-report.component.html',
  styleUrls: ['./cibil-report.component.css']
})
export class CibilReportComponent implements OnInit {

  constructor(private router: Router,private cibilService:CibilService) { this.model=new Cibilreport,this.objCibilModel=new Cibil;}
  model:Cibilreport;
  objCibilModel:Cibil;
  cibilReport:any;
  Name!:string
  Address!:string
  PanNumber!:string
  MobileNumber!:string
  EmailId!:string
  Gender!:string
  DateOfBirth!:string
  CreditAccountTotal!:string
  CreditAccountActive!:string
  CreditAccountClosed!:string
  CADSuitFiledCurrentBalance!:string

  TotalCurrentBalanceAmount!:string
  TotalSettledAmount!:string
  SecuredAccountAmount!:string
  UnsecuredAccountAmount!:string

  Last7DaysCredits!:string
  Last30DaysCredits!:string
  Last90DaysCredits!:string
  Last180DaysCredits!:string

  Last7DaysNonCredits!:string
  Last30DaysNonCredits!:string
  Last90DaysNonCredits!:string
  Last180DaysNonCredits!:string

  creditAccTypeArray:any;
  creditAccHolderType:any;
  creditAccSettled:any;
  creditAccActive:any;
  creditAccClosed:any;
  //singleCredit:Cibilreport[];
  //CreditList:any[];command by ajith Kumar
  singleCredit:any;
  ngOnInit(): void {
    this.routeUrl = this.router.url
    this.cibilService.testNameObservable.subscribe(response=>{
      this.GetSingleCibilReport(response);
    })
  }

GetSingleCibilReport(Id)
{
  this.cibilService.GetSingilCibilReport(Id).subscribe(
    response=>{

      this.BindCibilReport(response);
    }
  )
}
BindCibilReport(response)
{


        //this.cibilReport=response;
        this.Name=response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.First_Name + " " +
       response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.Last_Name;
        this.PanNumber=response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.IncomeTaxPan;
        this.Address=response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.FlatNoPlotNoHouseNo+","+response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.City;
        var TempTime=response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.Date_Of_Birth_Applicant;
        var TempYear = TempTime.slice(0, 4);
        var TempMonth = TempTime.slice(4, 6);
        var TempDay = TempTime.slice(6);
        this.DateOfBirth=TempDay + "-" + TempMonth + "-" + TempYear;
        this.EmailId=response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.EMailId;
        // this.EmailId=this.cibilReport.cibilReport.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.EMailId;
        this.Gender = response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.Gender_Code === 2 ? "Male" : "Female";

        this.MobileNumber=response.INProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details.MobilePhoneNumber;

        /*===== Credit Account Summary - start =====*/
        this.CreditAccountTotal=response.INProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountTotal;
        this.CreditAccountActive=response.INProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountActive;
        this.CreditAccountClosed=response.INProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountClosed;
        this.CADSuitFiledCurrentBalance=response.INProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CADSuitFiledCurrentBalance;
        /*===== Credit Account Summary - end =====*/

         /*===== Credit Balance Amount Summary - start =====*/
         this.TotalCurrentBalanceAmount=response.INProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_All;
         this.TotalSettledAmount=response.INProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured_Percentage;
         this.SecuredAccountAmount=response.INProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_Secured;
         this.UnsecuredAccountAmount=response.INProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured;
         /*===== Credit Balance Amount Summary - end =====*/

           /*===== Credit Enquiry Summary - start =====*/
           this.Last7DaysCredits=response.INProfileResponse.CAPS.CAPS_Summary.CAPSLast7Days;
           this.Last30DaysCredits=response.INProfileResponse.CAPS.CAPS_Summary.CAPSLast30Days;
           this.Last90DaysCredits=response.INProfileResponse.CAPS.CAPS_Summary.CAPSLast90Days;
           this.Last180DaysCredits=response.INProfileResponse.CAPS.CAPS_Summary.CAPSLast180Days;
           /*===== Credit Enquiry Summary - end =====*/

           /*===== Non-Credit Enquiry Summary - start =====*/
           this.Last7DaysNonCredits=response.INProfileResponse.NonCreditCAPS.NonCreditCAPS_Summary.NonCreditCAPSLast7Days;
           this.Last30DaysNonCredits=response.INProfileResponse.NonCreditCAPS.NonCreditCAPS_Summary.NonCreditCAPSLast30Days;
           this.Last90DaysNonCredits=response.INProfileResponse.NonCreditCAPS.NonCreditCAPS_Summary.NonCreditCAPSLast90Days;
           this.Last180DaysNonCredits=response.INProfileResponse.NonCreditCAPS.NonCreditCAPS_Summary.NonCreditCAPSLast180Days;
           /*===== Non-Credit Enquiry Summary - end =====*/

this.creditAccTypeArray = ["Other", "AUTO LOAN", "HOUSING LOAN", "PROPERTY LOAN", "LOAN AGAINST SHARES/SECURITIES", "PERSONAL LOAN", "CONSUMER LOAN", "GOLD LOAN", "EDUCATIONAL LOAN", "LOAN TO PROFESSIONAL", "CREDIT CARD",
           "LEASING", "OVERDRAFT", "TWO-WHEELER LOAN", "NON-FUNDED CREDIT FACILITY", "LOAN AGAINST BANK DEPOSITS", "FLEET CARD", "Commercial Vehicle Loan", "Telco – Wireless", "Telco – Broadband",
           "Telco – Landline", "Secured Credit Card", "Used Car Loan", "Construction Equipment Loan", "Tractor Loan", "Corporate Credit Card", "Kisan Credit Card", "Loan on Credit Card", "Prime Minister Jaan Dhan Yojana - Overdraft",
           "Mudra Loans – Shishu / Kishor / Tarun", "Microfinance – Others", "BUSINESS LOAN – GENERAL", "BUSINESS LOAN –PRIORITY SECTOR – SMALL BUSINESS", "BUSINESS LOAN –PRIORITY SECTOR – AGRICULTURE",
           "BUSINESS LOAN –PRIORITY SECTOR – OTHERS", "BUSINESS NON-FUNDED CREDIT FACILITY – GENERAL", "BUSINESS NON-FUNDED CREDIT FACILITY – PRIORITY SECTOR – SMALL BUSINESS", "BUSINESS NON-FUNDED CREDIT FACILITY – PRIORITY SECTOR – AGRICULTURE",
           "BUSINESS NON-FUNDED CREDIT FACILITY – PRIORITY SECTOR – OTHERS", "BUSINESS LOANS AGAINST BANK DEPOSITS", "Staff Loan", "Business Loan - Unsecured"];
this.creditAccHolderType = { 1: "Individual", 2: "Joint", 3: "Authorized User", 7: "Guarantor", otherwise: "Individual" };
this.creditAccSettled = [0, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72, 73, 74, 75, 76, 77, 79, 81, 85, 86, 87, 88, 90, 91, 93, 97];
this.creditAccActive = [11, 21, 22, 23, 24, 25, 71, 78, 80, 82, 83, 84];
this.creditAccClosed = [13, 14, 15, 16, 17];

let CreditAccountTable=response.INProfileResponse.CAIS_Account.CAIS_Account_DETAILS;
// console.log(Object.keys(this.cibilReport.cibilReport.INProfileResponse.CAIS_Account).length);
// this.model.CibilAccountTableList=[ {Subscriber_Name: 'Test', Account_Type: 'Savings',Account_Number: '10000213', AccountHoldertypeCode:'11', Date_Reported: '11-10-2019', Account_Status:'4da',Highest_Credit_or_Original_Loan_Amount:'10000',Current_Balance:'100', Amount_Past_Due:'11-10-2013'}];
if(CreditAccountTable.length>0){
  for(let i = 0; i<CreditAccountTable.length-1;i++)
  {
      var AccountStaus="";
        if (this.creditAccClosed.includes(Number(CreditAccountTable[i].Account_Status)))
        {
          AccountStaus="Settled";
        }
        else if(Number(this.creditAccClosed.includes(CreditAccountTable[i].Account_Status)))
        {
          AccountStaus="Active";
        }
        else
        {
          AccountStaus= "Closed";
        }
      var tempList:any=[{
        Subscriber_Name: CreditAccountTable[i].Subscriber_Name,
        Account_Type: this.creditAccTypeArray[Number(CreditAccountTable[i].Account_Type)],
        Account_Number: CreditAccountTable[i].Account_Number,
        AccountHoldertypeCode:this.creditAccHolderType[CreditAccountTable[i].AccountHoldertypeCode],
        Date_Reported:CreditAccountTable[i].Date_Reported.slice(6) + "-" + CreditAccountTable[i].Date_Reported.slice(4,6) + "-" + CreditAccountTable[i].Date_Reported.slice(0,4),
        Account_Status:AccountStaus,
        Open_Date:CreditAccountTable[i].Open_Date.slice(6) + "-" + CreditAccountTable[i].Open_Date.slice(4, 6) + "-" + CreditAccountTable[i].Open_Date.slice(0,4),
        Highest_Credit_or_Original_Loan_Amount:Number(CreditAccountTable[i].Highest_Credit_or_Original_Loan_Amount),
        Current_Balance:Number(CreditAccountTable[i].Current_Balance),
        Amount_Past_Due:Number(CreditAccountTable[i].Amount_Past_Due)}]

        this.model.CibilAccountTableList.push(tempList);
        this.singleCredit=this.model.CibilAccountTableList;
  }
  this.singleCredit.splice(0, 1);
}

}
  routeUrl!:string ;
}
