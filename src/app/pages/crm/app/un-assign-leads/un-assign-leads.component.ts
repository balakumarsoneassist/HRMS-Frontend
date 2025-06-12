import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead/lead.service';
import { LeadModel } from '../model/lead/lead-model';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { ContactService } from '../services/contact/contact.service';
import { IciciService } from '../services/Icici/icici.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { BajajService } from '../services/bajaj/bajaj.service';
import { LoaderService } from "../services/loader/loader.service";
import { AddBajajFormComponent } from "../add-bajaj-form/add-bajaj-form.component";

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';
import { AddIciciFormComponent } from "../add-icici-form/add-icici-form.component";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, AddBajajFormComponent, AddIciciFormComponent],
  selector: 'app-un-assign-leads',
  templateUrl: './un-assign-leads.component.html',
  styleUrls: ['./un-assign-leads.component.css'],
})
export class UnAssignLeadsComponent implements OnInit {
  ManualPageInput:any;
  PageNumber:number=0;
  TotalNumberOfPages:any =1;
  TotalRecordNo:Number=0;
  IsbtnPreviousEnable:boolean = true;
  IsbtnNextEnable:boolean = true;
  StartNo!:number;
  EndNo!:number;
  _objPageModel:PaginationModel;

  model: LeadModel;
  _objLeadFollowUp:LeadFollowUp;
  UnassignedLeadListFilter:any;
  unassignedList:any
  SearchText:any;
  loadSpin:number = 0;
  constructor(private leadService: LeadService,private leadTrackService:LeadtrackService,private iciciService:IciciService,private bajajService:BajajService,public loaderService: LoaderService)
   {
     this.model=new LeadModel,
     this._objLeadFollowUp=new LeadFollowUp,
     this._objPageModel=new PaginationModel
    }

  ngOnInit(): void {
    this.getUnassignedLeadList();
  }
  getUnassignedLeadList(){
    this._objPageModel.PageNumber=this.PageNumber;
    this._objPageModel.SearchText = this.SearchText;
    this.leadService.getUnassignLeadList(this._objPageModel).subscribe(
      response => {
          this.unassignedList=response
         // console.log(response)
          this.model.UnassignedLeadList=this.unassignedList;
          if(this.unassignedList.length==0){
            this.PageNumber=0;
            this.TotalRecordNo=0;
            this.TotalNumberOfPages=0;
            this.StartNo=0;
            this.EndNo=0;
            return;
          }
          this.TotalRecordNo=this.unassignedList[0].TotalRows;
          this.ManualPageInput=this.PageNumber+1;
          this.PageFooterCalculation();
          this.EnablePageButton();
      },
      error => alert('Error to retrive Unassigned Contact List')
    )
  }
  openCibilReportModel(Id) {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.style.display="flex";
    this.iciciService.SendIciciId(Id);
  }

  openCibilReportModel1(Id) {
    let cibilReportModel = document.querySelector('.cibilReportModel1') as HTMLInputElement;
    cibilReportModel.style.display="flex";
    this.bajajService.SendBajajId(Id);
   // this.iciciService.SendIciciId(Id);
  }

  closeModel() {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.removeAttribute('style');
  }
  closeModel1() {
    let cibilReportModel = document.querySelector('.cibilReportModel1') as HTMLInputElement;
    cibilReportModel.removeAttribute('style');
  }
  AssignEmployee(Id,TrackNumber)
{
  this._objLeadFollowUp.LeadId=Id;
  this._objLeadFollowUp.TrackId=TrackNumber;
 // console.log(this._objLeadFollowUp)
 this.loadSpin = 1;
  this.leadTrackService.AssignEmployeeToLead(this._objLeadFollowUp).subscribe(
    response=>{
      this.loadSpin = 0;
                  if(response==true)
                  {
                    alert('Lead Assigned Successfully');
                    this.getUnassignedLeadList();
                  }
              },
    error =>alert('InternalServer Error')
  )
}
GoToNextPage()
{
  if(this.PageNumber<this.TotalNumberOfPages)
  {
    this.PageNumber=this.PageNumber+1;
  }
this.getUnassignedLeadList();
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
  this.getUnassignedLeadList();
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
  let name: any = this.model
  this.TotalNumberOfPages=Math.floor(name.UnassignedLeadList[0].TotalRows/10);
  if((name.UnassignedLeadList[0].TotalRows%10)>0)
  {
    this.TotalNumberOfPages=this.TotalNumberOfPages+1;
  }
}
}
