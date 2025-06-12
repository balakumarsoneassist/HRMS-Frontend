import { Component, OnInit } from '@angular/core';
import { ContactModel, PaginationModel } from '../model/Contact/ContactModel';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';

import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';

import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { CallTrackHistoryComponent } from "../call-track-history/call-track-history.component";
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";


@Component({
     standalone: true,
  imports: [CommonModule,ReactiveFormsModule , FormsModule, CallTrackHistoryComponent, LeadFormModelComponent],
  selector: 'app-assigned-contacts',
  templateUrl: './assigned-contacts.component.html',
  styleUrls: ['./assigned-contacts.component.css']
})
export class AssignedContactsComponent implements OnInit {
  ContactList: any;
  model: ContactModel;
  _objLeadFollowUp: LeadFollowUp;
  ManualPageInput: any;
  PageNumber: number = 0;
  TotalNumberOfPages = 1;
  TotalRecordNo: Number = 0;
  IsbtnPreviousEnable: boolean = true;
  IsbtnNextEnable: boolean = true;
  StartNo: number | undefined;
  EndNo: number | undefined;
  _objPageModel: PaginationModel;
  ContactListFilter: any;

  fcContactfby : any = new FormControl('');
  fcStatus : any = new FormControl('');

  EmpList:any;
  StatusList:any;


  constructor(private contactSevice: ContactService, private leadTrackService: LeadtrackService,private _objEmpService:EmployeeService) {
    this.model = new ContactModel;
    this._objLeadFollowUp = new LeadFollowUp
    this._objPageModel = new PaginationModel;
  }

  ngOnInit(): void {
    this.leadTrackService.leadTrackSubjectObservable.subscribe(response => {
      this.GetContactList();
      this.EnablePageButton();
    })

    this.GetEmpNameList();
    this.GetStatusList();
  }

    getAssignedReport(){
      this.GetContactList();

    }

    //fill combobox
    GetEmpNameList(){
      this._objEmpService.GetAssigneeList().subscribe(
        response => {
            this.EmpList=response;console.log(this.EmpList);
            console.log(this.EmpList);
        },
        error => alert('InternalServer Error')
      )
    }

    GetStatusList(){
      this.contactSevice.GetStatusList().subscribe(
        response => {
            this.StatusList=response;console.log(this.StatusList);
            console.log(this.EmpList);
        },
        error => alert('InternalServer Error')
      )
    }

  callStatus(TrackId: string, Id) {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    this.contactSevice.SendLeadId(Id);
    this.contactSevice.SendLeadTrack(TrackId);
  }

  GetContactList() {
    console.log('test code')
    this._objPageModel.Status = this.fcStatus.value;
    this._objPageModel.AssigneeName = this.fcContactfby.value;
    this._objPageModel.PageNumber = this.PageNumber;
    this._objPageModel.SearchText = this.ContactListFilter;
    console.log(this._objPageModel);
    this.contactSevice.GetContactList(this._objPageModel).subscribe(
      response => {
        this.ContactList = response;
        if (this.ContactList.length == 0) {
          this.PageNumber = 0;
          this.TotalRecordNo = 0;
          this.TotalNumberOfPages = 0;
          this.StartNo = 0;
          this.EndNo = 0;
          return;
        }
        this.TotalRecordNo = this.ContactList[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
        this.PageFooterCalculation();
        this.EnablePageButton();
      }),
      error => ('Internal Server Error')
  }
  AssignEmployee(Id,IsConnectorContact) {
    this._objLeadFollowUp.LeadId = Id;
    this._objLeadFollowUp.IsConnectorContact = IsConnectorContact;
    this._objLeadFollowUp.ContactFollowedBy = 1;
    this.leadTrackService.AssignEmployeeToContact(this._objLeadFollowUp).subscribe(
      response => {
        if (response == true) {
          alert('Contact Assigned Successfully');
          this.GetContactList();
        }
      },
      error => alert('InternalServer Error')
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
  GoToNextPage() {
    if (this.PageNumber < this.TotalNumberOfPages) {
      this.PageNumber = this.PageNumber + 1;
    }
    this.GetContactList();
    this.EnablePageButton();
  }
  GoToPreviousPage() {
    if (this.PageNumber > 0) {
      this.PageNumber = this.PageNumber - 1;
    }
    else {
      this.IsbtnPreviousEnable = false;
    }
    this.GetContactList();
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
    this.TotalNumberOfPages = Math.floor(this.ContactList[0].TotalRows / 10);
    if ((this.ContactList[0].TotalRows % 10) > 0) {
      this.TotalNumberOfPages = this.TotalNumberOfPages + 1;
    }
  }
  ChangePageNumber(pageIndex) {
    this._objPageModel.PageNumber = pageIndex;
    this.GetContactList();
  }
  deleteRow(x) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      this.ContactList.splice(x, 1);
    }
  }
}
