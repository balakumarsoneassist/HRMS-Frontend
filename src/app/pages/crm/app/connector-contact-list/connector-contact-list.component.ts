import { Component, OnInit } from '@angular/core';
import { ContactModel, PaginationModel } from '../model/Contact/ContactModel';
import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { LocationServiceService } from '../services/location/location-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';
//import { LoginService } from '../services/login/login.service';
@Component({
    standalone: true,
      imports:[CommonModule,FormsModule],
  selector: 'app-connector-contact-list',
  templateUrl: './connector-contact-list.component.html',
  styleUrls: ['./connector-contact-list.component.css']
})
export class ConnectorContactListComponent implements OnInit {
  LocationList:any;
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
  contactList:any;
  _objLeadFollowUp:LeadFollowUp;
  _objPageModel:PaginationModel;
  constructor(
    private contactService: ContactService,
   // private loginService:LoginService,
    private leadTrackService:LeadtrackService,
    private objLocationService:LocationServiceService
    ) {
    this.model = new ContactModel;
    this._objPageModel=new PaginationModel;
    this._objLeadFollowUp=new LeadFollowUp;

  }

  ngOnInit(): void {
      this.getConnectorContactList();
      this.EnablePageButton();
      this.GetLocationList();
  }
getConnectorContactList(){
  this._objPageModel.PageNumber=this.PageNumber;
  this._objPageModel.SearchText = this.SearchText;
  this.contactService.GetConnectorContactList(this._objPageModel).subscribe(
    response => {
        this.contactList=response;
        //this.model.UnassignedContactList=this.contactList;
        if(this.contactList.length==0){
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
updateConnectorContact(Id,LocationId)
{
  this.model.LocationId=LocationId;
  this.model.Id=Id;
  this.contactService.updateConnectorContact(this.model).subscribe(
    response=>{
                  if(response==true)
                  {
                    alert('LocationId updated successfully in connectorcontact.');
                    this.getConnectorContactList();
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
this.getConnectorContactList();
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
  this.getConnectorContactList();
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
    this.getConnectorContactList();
  //}

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
