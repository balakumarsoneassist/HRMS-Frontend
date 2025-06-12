import { Component, OnInit, Input } from '@angular/core';
import { LeadService } from '../services/lead/lead.service';
import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { PaginationInstance } from 'ngx-pagination';
import { PaginationModel } from '../model/Contact/ContactModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';
import { CallTrackHistoryComponent } from "../call-track-history/call-track-history.component";
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";

@Component({
    imports: [CommonModule, FormsModule, CallTrackHistoryComponent, LeadFormModelComponent],
    standalone: true,
  templateUrl: './leads-details.component.html',
  styleUrls: ['./leads-details.component.css']
})
export class LeadsDetailsComponent implements OnInit {
  ManualPageInput:any;
  PageNumber:number=0;
  TotalNumberOfPages=1;
  TotalRecordNo:Number=0;
  IsbtnPreviousEnable:boolean = true;
  IsbtnNextEnable:boolean = true;
  StartNo!:number;
  EndNo!:number;
  _objPageModel:PaginationModel;

  leadFilter: any;
  LeadList:any;
  leadStatus = "Santioned";
  _objLeadFollowUp:LeadFollowUp;
  constructor(private leadService:LeadService,private contactSevice:ContactService,private leadTrackService:LeadtrackService)
  {
    this._objLeadFollowUp=new LeadFollowUp;
    this._objPageModel=new PaginationModel
   }

        ngOnInit(): void {
          this.leadTrackService.leadTrackSubjectObservable.subscribe(response=>{
            this.GetLeadList();
          })
          this.GetLeadList();
        }

      callStatus(TrackId:string,Id) {
        let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
        leadFormModel.style.display = "flex";
        this.contactSevice.SendLeadId(Id);
        this.contactSevice.SendLeadTrack(TrackId);
      }
      GetLeadList(){

        this._objPageModel.PageNumber=this.PageNumber;
        this._objPageModel.SearchText = this.leadFilter;
        this.leadService.GetLeadList(this._objPageModel).subscribe(
          response => {
            this.LeadList=response;
            if(this.LeadList.length==0){
              this.PageNumber=0;
              this.TotalRecordNo=0;
              this.TotalNumberOfPages=0;
              this.StartNo=0;
              this.EndNo=0;
              return;
            }
          this.TotalRecordNo=this.LeadList[0].TotalRows;
          this.ManualPageInput=this.PageNumber+1;
          this.PageFooterCalculation();
          this.EnablePageButton();
          })
      }
      CreateNewLeadTrack(Id){
        this.leadTrackService.CreateNewLeadTrack(Id).subscribe(
          response=>{
            if(response==true){
              this.GetLeadList();
            }
          },
          error=>alert('Internal Server Error')
        )
      }

      AssignEmployee(Id,TrackNumber)
      {

        this._objLeadFollowUp.LeadId=Id;
        this._objLeadFollowUp.TrackId=TrackNumber;

        this.leadTrackService.AssignEmployeeToLead(this._objLeadFollowUp).subscribe(
          response=>{
                        if(response==true)
                        {
                          alert('Lead Assigned Successfully');
                          this.GetLeadList();
                        }
                    },
          error =>alert('InternalServer Error')
        )
      }
      OpenTrackHistoryModel(TrackNumber) {
        let leadFormModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
        leadFormModel.style.display = "flex";
        this.contactSevice.SendLeadTrack(TrackNumber);
      }
      CloseTrackHistoryModel() {
        let leadFormModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
        leadFormModel.removeAttribute('style');
      }
      GoToNextPage()
{
  if(this.PageNumber<this.TotalNumberOfPages)
  {
    this.PageNumber=this.PageNumber+1;
  }
this.GetLeadList();
this.EnablePageButton();
}
GoToPreviousPage()
{
  if(this.PageNumber>0){
    this.PageNumber=this.PageNumber-1;
  }
  else
  {
    this.IsbtnPreviousEnable=false;
  }
  this.GetLeadList();
  this.EnablePageButton();
}
EnablePageButton()
{

  if(this.PageNumber>0){
    this.IsbtnPreviousEnable=true;
  }
  else{
    this.IsbtnPreviousEnable=false;
  }
  if(this.PageNumber+1<this.TotalNumberOfPages||this.PageNumber==0){

    this.IsbtnNextEnable=true;
  }
  else{
    this.IsbtnNextEnable=false;
  }
}
PageFooterCalculation()
{
  this.StartNo=(this.PageNumber*10)+1;
  this.EndNo=(this.PageNumber*10)+10;
  this.TotalNumberOfPages=Math.floor(this.LeadList[0].TotalRows/10);
  if((this.LeadList[0].TotalRows%10)>0)
  {
    this.TotalNumberOfPages=this.TotalNumberOfPages+1;
  }
}

  deleteRow(x) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      this.LeadList.splice(x, 1);
    }
  }

}
