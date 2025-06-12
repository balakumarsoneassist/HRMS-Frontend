import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { LoaderService } from "../services/loader/loader.service";

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
  selector: 'app-un-track-contact',
  templateUrl: './un-track-contact.component.html',
  styleUrls: ['./un-track-contact.component.css']
})
export class UnTrackContactComponent implements OnInit {
  ContactUnTrackList:any;
 // ContactOnTrackList:any;
  ManualPageInput: any;
  PageNumber: number = 0;
  TotalNumberOfPages = 1;
  TotalRecordNo: Number = 0;
  IsbtnPreviousEnable: boolean = true;
  IsbtnNextEnable: boolean = true;
  StartNo!: number;
  EndNo!: number;
  _objPageModel: PaginationModel;

  loadSpin:number = 0;

  constructor(private _objLeadTrackService: LeadtrackService,private contactService:ContactService, public loaderService: LoaderService) {
    this._objPageModel=new PaginationModel;
   }

  ngOnInit(): void {
    this._objLeadTrackService.leadTrackSubjectObservable.subscribe(response=>{
      this.GetUntrackContactList();
    })
    this.GetUntrackContactList();
  }

  GetUntrackContactList(){
    this.loadSpin = 1;
    this._objPageModel.PageNumber = this.PageNumber;
    this._objLeadTrackService.GetContactUntrack(this._objPageModel).subscribe(
      response => {
        this.ContactUnTrackList = response;
       // console.log(response);
        this.loadSpin = 0;
        if (this.ContactUnTrackList.length == 0) {

          this.PageNumber = 0;
          this.TotalRecordNo = 0;
          this.TotalNumberOfPages = 0;
          this.StartNo = 0;
          this.EndNo = 0;
          alert("No records found...!");
          return;
        }
        this.TotalRecordNo = this.ContactUnTrackList[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
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
  GoToPreviousPage()
  {
    if (this.PageNumber > 0) {
      this.PageNumber = this.PageNumber - 1;
    }
    else {
      this.IsbtnPreviousEnable = false;
    }
    this.GetUntrackContactList();
    this.EnablePageButton();
  }
  GoToNextPage()
  {
    if(this.PageNumber<this.TotalNumberOfPages)
    {
      this.PageNumber=this.PageNumber+1;
    }
  this.GetUntrackContactList();
  this.EnablePageButton();
  }
  EnablePageButton() {

    if (this.PageNumber > 0) {
      this.IsbtnPreviousEnable = true;
    }
    else {
      this.IsbtnPreviousEnable = false;
    }
    if (this.PageNumber + 1 < this.TotalNumberOfPages || this.PageNumber == 0) {

      this.IsbtnNextEnable = true;
    }
    else {
      this.IsbtnNextEnable = false;
    }
  }
  PageFooterCalculation() {
    this.StartNo = (this.PageNumber * 10) + 1;
    this.EndNo = (this.PageNumber * 10) + 10;
    this.TotalNumberOfPages = Math.floor(this.ContactUnTrackList[0].TotalRows / 10);
    if ((this.ContactUnTrackList[0].TotalRows % 10) > 0) {
      this.TotalNumberOfPages = this.TotalNumberOfPages + 1;
    }
  }

}
