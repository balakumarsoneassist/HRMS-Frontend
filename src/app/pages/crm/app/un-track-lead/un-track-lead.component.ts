import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { ContactService } from '../services/contact/contact.service';
import { LoaderService } from '../services/loader/loader.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-un-track-lead',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputTextModule,
    ToastModule,
    LeadFormModelComponent,
    DialogModule
],
  providers: [MessageService],
  templateUrl: './un-track-lead.component.html',
  styleUrls: ['./un-track-lead.component.css']
})
export class UnTrackLeadComponent implements OnInit {
  LeadUnTrackList: any[] = [];
  PageNumber = 0;
  TotalNumberOfPages = 1;
  TotalRecordNo = 0;
  ManualPageInput = 1;
  StartNo = 0;
  EndNo = 0;
  loadSpin = 0;

  IsbtnPreviousEnable = true;
  IsbtnNextEnable = true;
  globalFilter: string = '';

  _objPageModel = new PaginationModel();
  _objLeadFollowUp = new LeadFollowUp();
    showLeadFormModel: boolean = false;

  constructor(
    private _objLeadTrackService: LeadtrackService,
    private contactService: ContactService,
    public loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._objLeadTrackService.leadTrackSubjectObservable.subscribe(() => {
      this.GetUntrackLeadList();
    });
    this.GetUntrackLeadList();
  }

  onLazyLoad(event: any): void {
    this.PageNumber = Math.floor(event.first / event.rows);
    this._objPageModel.PageNumber = this.PageNumber;
    this.GetUntrackLeadList();
  }

  GetUntrackLeadList(): void {
    this.loadSpin = 1;
    this._objPageModel.PageNumber = this.PageNumber;

    this._objLeadTrackService.GetLeadUnTrack(this._objPageModel).subscribe({
      next: (response: any[]) => {
        this.LeadUnTrackList = response || [];
        this.loadSpin = 0;

        if (this.LeadUnTrackList.length === 0) {
          this.TotalRecordNo = 0;
          this.messageService.add({
            severity: 'info',
            summary: 'No Data',
            detail: 'No records found...!'
          });
          return;
        }

        this.TotalRecordNo = this.LeadUnTrackList[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
        this.PageFooterCalculation();
        this.EnablePageButton();
      },
      error: () => {
        this.loadSpin = 0;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch lead list.'
        });
      }
    });
  }

  callStatus(Id: number, TrackNumber: string): void {

    const leadFormModel = document.querySelector('.leadInputModel') as HTMLElement;
    if (leadFormModel) leadFormModel.style.display = 'flex';
    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackNumber);
    this.showLeadFormModel = true;

  }

  GoToNextPage(): void {
    if (this.PageNumber + 1 < this.TotalNumberOfPages) {
      this.PageNumber++;
      this.GetUntrackLeadList();
    }
    this.EnablePageButton();
  }

  GoToPreviousPage(): void {
    if (this.PageNumber > 0) {
      this.PageNumber--;
      this.GetUntrackLeadList();
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
