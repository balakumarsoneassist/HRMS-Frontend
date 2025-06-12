import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { ContactModel, PaginationModel } from '../model/Contact/ContactModel';
import { Tokenauthentication } from '../model/common/tokenauthentication';
import { LoginService } from '../services/login/login.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
  selector: 'app-unassigned-contacts',
  templateUrl: './unassigned-contacts.component.html',
  styleUrls: ['./unassigned-contacts.component.css']
})
export class UnassignedContactsComponent implements OnInit {
  SearchText:any;
  ManualPageInput:any;
  IsbtnPreviousEnable:boolean=false;
  IsbtnNextEnable:boolean=true;
  PageNumber:number=0;
  TotalRecordNo:Number=0;
  StartNo!:number;
  EndNo!:number;
  TotalNumberOfPages=1;


  model: ContactModel;
  unassignedList:any;
  _objLeadFollowUp:LeadFollowUp;
  _objPageModel:PaginationModel;

  constructor(private contactService: ContactService,private loginService:LoginService,private leadTrackService:LeadtrackService) {
    this.model = new ContactModel;
    this._objPageModel=new PaginationModel;
    this._objLeadFollowUp=new LeadFollowUp;
  }

  ngOnInit(): void {
      this.getUnassignedContactList();
      this.EnablePageButton();
  }
getUnassignedContactList(){
  this._objPageModel.PageNumber=this.PageNumber;
  this._objPageModel.SearchText = this.SearchText;
  //this.objTokenauthentication.checkTokenExpiredStatus();
  this.contactService.getUnassignContactList(this._objPageModel).subscribe(
    response => {
        this.unassignedList=response
        this.model.UnassignedContactList=this.unassignedList;
      //  console.log(this.unassignedList)
        if(this.model.UnassignedContactList.length==0){
          this.PageNumber=0;
          this.TotalRecordNo=0;
          this.TotalNumberOfPages=0;
          this.StartNo=0;
          this.EndNo=0;
          return;
        }
        this.TotalRecordNo=this.model.UnassignedContactList[0].TotalRows;
        this.ManualPageInput=this.PageNumber+1;
        this.PageFooterCalculation();
    },
    error => alert('InternalServer Error')
  )
}
AssignEmployee(Id, IsConnectorContact)
{
  this._objLeadFollowUp.LeadId=Id;
  this._objLeadFollowUp.ContactFollowedBy=1;
  this._objLeadFollowUp.IsConnectorContact = IsConnectorContact;
  this.leadTrackService.AssignEmployeeToContact(this._objLeadFollowUp).subscribe(
    response=>{
                  if(response==true)
                  {
                    alert('Contact Assigned Successfully');
                    this.getUnassignedContactList();
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
this.getUnassignedContactList();
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
  this.getUnassignedContactList();
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
  this.TotalNumberOfPages=Math.floor(this.model.UnassignedContactList[0].TotalRows/10);
  if((this.model.UnassignedContactList[0].TotalRows%10)>0)
  {
    this.TotalNumberOfPages=this.TotalNumberOfPages+1;
  }
}
ChangePageNumber(pageIndex:number){
  //if(pageIndex<=this.TotalNumberOfPages){
    this.PageNumber=(pageIndex*1)-1;
    this.getUnassignedContactList();
  //}

}
}
