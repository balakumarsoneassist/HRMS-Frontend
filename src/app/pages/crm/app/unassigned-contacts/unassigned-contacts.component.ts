import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact/contact.service';
import { ContactModel, PaginationModel } from '../model/Contact/ContactModel';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';
import { MessageService } from 'primeng/api';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  selector: 'app-unassigned-contacts',
  templateUrl: './unassigned-contacts.component.html',
  styleUrls: ['./unassigned-contacts.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    CardModule
  ]
})
export class UnassignedContactsComponent implements OnInit {
  model: ContactModel = new ContactModel();
  unassignedList: any[] = [];
  _objLeadFollowUp: LeadFollowUp = new LeadFollowUp();
  _objPageModel: PaginationModel = new PaginationModel();

  SearchText: string = '';
  PageNumber: number = 0;
  TotalRecordNo: number = 0;
  TotalNumberOfPages: number = 1;
  StartNo: number = 0;
  EndNo: number = 0;

  constructor(
    private contactService: ContactService,
    private leadTrackService: LeadtrackService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUnassignedContactList();
  }

  getUnassignedContactList() {
    this._objPageModel.PageNumber = this.PageNumber;
    this._objPageModel.SearchText = this.SearchText;

    this.contactService.getUnassignContactList(this._objPageModel).subscribe({
      next: (response: any) => {
        this.unassignedList = response || [];
        this.model.UnassignedContactList = this.unassignedList;

        if (!this.unassignedList.length) {
          this.resetPagination();
          return;
        }

        this.TotalRecordNo = this.unassignedList[0].TotalRows;
        this.TotalNumberOfPages = Math.ceil(this.TotalRecordNo / 10);
        this.StartNo = this.PageNumber * 10 + 1;
        this.EndNo = Math.min((this.PageNumber + 1) * 10, this.TotalRecordNo);
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
    });
  }

  assignEmployee(id: number, isConnectorContact: boolean) {
     this._objLeadFollowUp.LeadId=id;
  this._objLeadFollowUp.ContactFollowedBy=1;
  this._objLeadFollowUp.IsConnectorContact = isConnectorContact;
  this.leadTrackService.AssignEmployeeToContact(this._objLeadFollowUp).subscribe({
      next: (response: any) => {
        if (response === true) {
          this.messageService.add({ severity: 'success', summary: 'Assigned', detail: 'Contact assigned successfully' });
          this.getUnassignedContactList();
        }
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Assignment Failed' })
    });
  }

  onLazyLoad(event: any) {
    this.PageNumber = event.first / event.rows;
    this.getUnassignedContactList();
  }

  resetPagination() {
    this.PageNumber = 0;
    this.TotalRecordNo = 0;
    this.TotalNumberOfPages = 1;
    this.StartNo = 0;
    this.EndNo = 0;
  }
  loading: boolean = false;

  loadUnassignedContacts(event: any) {
  this.loading = true;
  this.PageNumber = event.first / event.rows;

  this._objPageModel.PageNumber = this.PageNumber;
  this._objPageModel.SearchText = this.SearchText;

  this.contactService.getUnassignContactList(this._objPageModel).subscribe({
    next: (response: any) => {
      this.unassignedList = response || [];
      this.model.UnassignedContactList = this.unassignedList;

      if (!this.unassignedList.length) {
        this.resetPagination();
      } else {
        this.TotalRecordNo = this.unassignedList[0].TotalRows;
        this.TotalNumberOfPages = Math.ceil(this.TotalRecordNo / 10);
        this.StartNo = this.PageNumber * 10 + 1;
        this.EndNo = Math.min((this.PageNumber + 1) * 10, this.TotalRecordNo);
      }

      this.loading = false;
    },
    error: () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' });
      this.loading = false;
    }
  });
}

}
