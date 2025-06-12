import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { LoaderService } from "../services/loader/loader.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports:[CommonModule,FormsModule],
  selector: 'app-on-track-contact',
  templateUrl: './on-track-contact.component.html',
  styleUrls: ['./on-track-contact.component.css']
})
export class OnTrackContactComponent implements OnInit {
  ContactOnTrackList:any;
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

  constructor(private contactService: ContactService,private _objLeadTrackService:LeadtrackService, public loaderService: LoaderService) {
    this._objPageModel=new PaginationModel;
   }

  ngOnInit(): void {
    this.GetOntrackContactList();
  }

  callStatus(Id,TrackNumber) {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    this.contactService.statusOpeningAcco();
    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackNumber);
  }

GetOntrackContactList(){
  this.loadSpin = 1;
    this._objPageModel.PageNumber = this.PageNumber;
    this._objLeadTrackService.GetContactOntrack(this._objPageModel).subscribe(
      response => {
        this.ContactOnTrackList = response;
      //  console.log(response);
        this.loadSpin = 0;
        if (this.ContactOnTrackList.length == 0) {
          this.PageNumber = 0;
          this.TotalRecordNo = 0;
          this.TotalNumberOfPages = 0;
          this.StartNo = 0;
          this.EndNo = 0;
          alert("No records found...!");
          return;
        }
        this.TotalRecordNo = this.ContactOnTrackList[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
        this.PageFooterCalculation();
        this.EnablePageButton();
      })
  }
  GoToPreviousPage()
  {
    if (this.PageNumber > 0) {
      this.PageNumber = this.PageNumber - 1;
    }
    else {
      this.IsbtnPreviousEnable = false;
    }
    this.GetOntrackContactList();
    this.EnablePageButton();
  }
  GoToNextPage()
  {
    if(this.PageNumber<this.TotalNumberOfPages)
    {
      this.PageNumber=this.PageNumber+1;
    }
  this.GetOntrackContactList();
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
    this.TotalNumberOfPages = Math.floor(this.ContactOnTrackList[0].TotalRows / 10);
    if ((this.ContactOnTrackList[0].TotalRows % 10) > 0) {
      this.TotalNumberOfPages = this.TotalNumberOfPages + 1;
    }
  }
}
