import { Component, OnInit } from '@angular/core';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { ContactService } from '../services/contact/contact.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { LoaderService } from "../services/loader/loader.service";

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
  selector: 'app-un-track-lead',
  templateUrl: './un-track-lead.component.html',
  styleUrls: ['./un-track-lead.component.css']
})
export class UnTrackLeadComponent implements OnInit {
  LeadUnTrackList:any;
  ManualPageInput:any;
  PageNumber:number=0;
  TotalNumberOfPages=1;
  TotalRecordNo:Number=0;
  IsbtnPreviousEnable:boolean = true;
  IsbtnNextEnable:boolean = true;
  StartNo!:number;
  EndNo!:number;
  _objPageModel:PaginationModel;


  LeadList:any;
  leadStatus = "Santioned";
  _objLeadFollowUp:LeadFollowUp;
  leadService: any;
  //objLeadUnTrackList: any;
  loadSpin:number = 0;

  constructor(private _objLeadTrackService:LeadtrackService,private contactService:ContactService, public loaderService: LoaderService)
  {
    this._objLeadFollowUp=new LeadFollowUp;
    this._objPageModel=new PaginationModel
  }

  ngOnInit(): void {
    this._objLeadTrackService.leadTrackSubjectObservable.subscribe(response=>{
      this.GetUntrackLeadList();
    })
    this.GetUntrackLeadList();
  }
  GetUntrackLeadList(){
    this.loadSpin = 1;
    this._objPageModel.PageNumber=this.PageNumber;
    this._objLeadTrackService.GetLeadUnTrack(this._objPageModel).subscribe(
      response => {
        this.LeadUnTrackList=response;
        this.loadSpin = 0;
     //   console.log(response);
        if(this.LeadUnTrackList.length==0){
          alert("No records found...!");
          this.PageNumber=0;
          this.TotalRecordNo=0;
          this.TotalNumberOfPages=0;
          this.StartNo=0;
          this.EndNo=0;
          return;
}
this.TotalRecordNo=this.LeadUnTrackList[0].TotalRows;
    this.ManualPageInput=this.PageNumber+1;
    this.PageFooterCalculation();
    this.EnablePageButton();
      })
}
callStatus(Id,TrackNumber) {
  let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
  leadFormModel.style.display = "flex";
  this.contactService.SendLeadId(Id);
  this.contactService.SendLeadTrack(TrackNumber);
}
GoToNextPage()
{
  if(this.PageNumber<this.TotalNumberOfPages)
  {
    this.PageNumber=this.PageNumber+1;
  }
this.GetUntrackLeadList();
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
  this.GetUntrackLeadList();
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
  this.TotalNumberOfPages=Math.floor(this.LeadUnTrackList[0].TotalRows/10);
  if((this.LeadUnTrackList[0].TotalRows%10)>0)
  {
    this.TotalNumberOfPages=this.TotalNumberOfPages+1;
  }
}

}
