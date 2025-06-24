import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { LoaderService } from '../services/loader/loader.service';
import { PaginationModel } from '../model/Contact/ContactModel';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";

@Component({
  selector: 'app-un-track-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputTextModule,
    ToastModule,
    DialogModule,
    LeadFormModelComponent
],
  providers: [MessageService],
  templateUrl: './un-track-contact.component.html',
  styleUrls: ['./un-track-contact.component.css']
})
export class UnTrackContactComponent implements OnInit {
  ContactUnTrackList: any[] = [];
  PageNumber = 0;
  TotalRecordNo = 0;
  TotalNumberOfPages = 1;
  ManualPageInput = 1;
  StartNo = 0;
  EndNo = 0;
  loadSpin = 0;
 // Modal state
  showLeadFormModel = false;
  selectedLeadId: number | null = null;
  selectedTrackNumber: string | null = null;
  IsbtnPreviousEnable = true;
  IsbtnNextEnable = true;
  globalFilter: string = '';

  _objPageModel: PaginationModel = new PaginationModel();

  constructor(
    private _objLeadTrackService: LeadtrackService,
    private contactService: ContactService,
    public loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._objLeadTrackService.leadTrackSubjectObservable.subscribe(() => {
      this.GetUntrackContactList();
    });
    this.GetUntrackContactList();
  }

  onLazyLoad(event: any): void {
    this.PageNumber = Math.floor(event.first / event.rows);
    console.log( this.PageNumber,event);

    this._objPageModel.PageNumber = this.PageNumber;
    this.GetUntrackContactList();
  }

  callStatus(Id: number, TrackNumber: string): void {
    const leadFormModel = document.querySelector('.leadInputModel') as HTMLElement;
    if (leadFormModel) {
      leadFormModel.style.display = 'flex';
    }
    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackNumber);
     this.showLeadFormModel = true;
  }

  GetUntrackContactList(): void {
    this.loadSpin = 1;
    this._objPageModel.PageNumber = this.PageNumber;
console.log(this._objPageModel);

    this._objLeadTrackService.GetContactUntrack(this._objPageModel).subscribe({
      next: (response: any[]) => {
        this.ContactUnTrackList = response || [];
        this.loadSpin = 0;

        if (this.ContactUnTrackList.length === 0) {
          this.PageNumber = 0;
          this.TotalRecordNo = 0;
          this.TotalNumberOfPages = 0;
          this.StartNo = 0;
          this.EndNo = 0;

          this.messageService.add({
            severity: 'info',
            summary: 'No Data',
            detail: 'No records found...!'
          });
          return;
        }

        this.TotalRecordNo = this.ContactUnTrackList[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
        this.PageFooterCalculation();
        this.EnablePageButton();
      },
      error: () => {
        this.loadSpin = 0;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch contact list.'
        });
      }
    });
  }

  GoToPreviousPage(): void {
    if (this.PageNumber > 0) {
      this.PageNumber--;
      this.GetUntrackContactList();
    }
    this.EnablePageButton();
  }

  GoToNextPage(): void {
    if (this.PageNumber + 1 < this.TotalNumberOfPages) {
      this.PageNumber++;
      this.GetUntrackContactList();
    }
    this.EnablePageButton();
  }

  EnablePageButton(): void {
    this.IsbtnPreviousEnable = this.PageNumber > 0;
    this.IsbtnNextEnable = this.PageNumber + 1 < this.TotalNumberOfPages;
  }

  PageFooterCalculation(): void {
    this.StartNo = this.PageNumber * 10 + 1;
    this.EndNo = Math.min(this.StartNo + 9, this.TotalRecordNo);
    this.TotalNumberOfPages = Math.floor(this.TotalRecordNo / 10);
    if (this.TotalRecordNo % 10 > 0) {
      this.TotalNumberOfPages++;
    }
  }

   closeLeadFormModel(): void {
    this.showLeadFormModel = false;
  }
}
