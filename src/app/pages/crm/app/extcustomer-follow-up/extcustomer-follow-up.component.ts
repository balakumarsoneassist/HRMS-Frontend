import { Component, OnInit } from '@angular/core';
import { ExtCustFollowUp } from '../model/extcustomer/extcustomer';
import { StatusCodeDataModel } from '../model/StatusCode/statuscode';
import { BankService } from '../services/bank/bank.service';
import { ExtCustomerService } from '../services/extcustomer/extcustomer.service';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { TrackExtCust } from '../model/extcustomer/extcustomer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule,CalendarModule],
  selector: 'app-extcustomer-follow-up',
  templateUrl: './extcustomer-follow-up.component.html',
  styleUrls: ['./extcustomer-follow-up.component.css']
})
export class ExtcustomerFollowUpComponent implements OnInit {
  StatusCode:any;
  model: ExtCustFollowUp =  new ExtCustFollowUp;
  trackParmeter:TrackExtCust = new TrackExtCust;
  custtrackdatalist:any;
  BankList:any;
  currentDateTime: any = new Date();
  constructor(private _objBankService:BankService,private _objExtCustService:ExtCustomerService,private _objCusttrackservice:CustomertrackService) { }

  ngOnInit(): void {
    this.GetBankNameList();
    this.SetStatus();

    //pass cust id and get data from custtrack table
    this._objCusttrackservice.custSendObservable.subscribe(response=>{
      //   console.log(response+'-------QWE')
         this.GetExtCustTrackData(response); // ie from id, here response is id
       })
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
    //if(this.model.Status<4)
   // {
      this.StatusCode=StatusCodeDataModel.ContactStatusDataModel
   /* }
    if(this.model.Status==4)
    {
      this.StatusCode=StatusCodeDataModel.ApproveStatusDataModel;
    }*/
  }



  SaveCustomerTrack(IsClose:boolean)
{


  console.log(this.model);
  this._objExtCustService.SaveCustomerTrack(this.model).subscribe(
    response => {
      if(response == true) {
        alert(" Saved Sucessfully");
        this.model.AppoinmentDate = new Date();
        this.model.Notes = '';
        this.model.Status = 0;
        this._objCusttrackservice.SendCustomerTrack(this.model.TrackNumber);
       // this._objCusttrackservice.CustListRefresh();
        if(IsClose==true)
        {
          this.closeModel();
        }
         }
    },
    error => alert('Cant Save')
  )
}

closeModel() {
  //let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
  let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
 // customerModel.style.display = "flex";
  //leadFormModel.removeAttribute('style');
  customerModel.removeAttribute('style');
}

GetExtCustTrackData(CustomerId:any)
{
   // console.log(Id+'-------QWE2')
   this.trackParmeter.Id = CustomerId;
 //console.log(this.paraModel + '----QWE3')
 this._objCusttrackservice.GetExtCustomerTrack(this.trackParmeter).subscribe(
  response => {
    console.log(response)
      //this.model=response;
      this.custtrackdatalist = response;
      this.DataFill();

  },
  error => alert('Internal Server Error')
)

}

DataFill(){
  for(let i=0; i<this.custtrackdatalist.length; i++) {
   //console.log(this.ChildList[i].chseckey)
   this.model.Id = this.custtrackdatalist[i].Id;
   this.model.LoanType = this.custtrackdatalist[i].LoanType;
   this.model.DesireLoanAmount =this.custtrackdatalist[i].DesireLoanAmount;
   this.model.Tenure =this.custtrackdatalist[i].Tenure;

   this.model.PreferedBank =this.custtrackdatalist[i].PreferedBank;
   this.model.Cibilscore =this.custtrackdatalist[i].Cibilscore;
   this.model.OccupationType =this.custtrackdatalist[i].OccupationType;
   this.model.IncomeType =this.custtrackdatalist[i].IncomeType;
   this.model.IncomeAmount =this.custtrackdatalist[i].IncomeAmount;
   this.model.TrackNumber = this.custtrackdatalist[i].TrackNumber;


  }

 }

}
