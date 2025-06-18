import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { ContactService } from '../services/contact/contact.service';
import { LoaderService } from '../services/loader/loader.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { LeadFollowUp } from '../model/leadFollowUp/lead-follow-up';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";

@Component({
  selector: 'app-on-track-lead',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    InputTextModule,
    DialogModule,
    LeadFormModelComponent
],
  providers: [MessageService],
  templateUrl: './on-track-lead.component.html',
  styleUrls: ['./on-track-lead.component.css']
})
export class OnTrackLeadComponent implements OnInit {
  LeadOnTrackList: any[] = [];
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

  selectedLeadId: number | null = null;
  selectedTrackNumber: string | null = null;
  showLeadFormModel = false;

  _objPageModel = new PaginationModel();
  _objLeadFollowUp = new LeadFollowUp();

  constructor(
    private _objLeadTrackService: LeadtrackService,
    private contactService: ContactService,
    public loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._objLeadTrackService.leadTrackSubjectObservable.subscribe(() => {
      this.GetLeadOntrackList();
    });
    this.GetLeadOntrackList();
  }

  onLazyLoad(event: any): void {
    this.PageNumber = Math.floor(event.first / event.rows);
    this._objPageModel.PageNumber = this.PageNumber;
    this.GetLeadOntrackList();
  }

  GetLeadOntrackList(): void {
    this.loadSpin = 1;
    this._objPageModel.PageNumber = this.PageNumber;

    this._objLeadTrackService.GetLeadOntrack(this._objPageModel).subscribe({
      next: (response: any[]) => {
        this.LeadOnTrackList = response || [];
        this.loadSpin = 0;

        if (this.LeadOnTrackList.length === 0) {
          this.TotalRecordNo = 0;
          this.messageService.add({
            severity: 'info',
            summary: 'No Data',
            detail: 'No records found...!'
          });
          return;
        }

        this.TotalRecordNo = this.LeadOnTrackList[0].TotalRows;
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

  PageFooterCalculation(): void {
    this.StartNo = this.PageNumber * 10 + 1;
    this.EndNo = Math.min(this.StartNo + 9, this.TotalRecordNo);
    this.TotalNumberOfPages = Math.floor(this.TotalRecordNo / 10);
    if (this.TotalRecordNo % 10 > 0) {
      this.TotalNumberOfPages++;
    }
  }

  EnablePageButton(): void {
    this.IsbtnPreviousEnable = this.PageNumber > 0;
    this.IsbtnNextEnable = this.PageNumber + 1 < this.TotalNumberOfPages;
  }

  GoToPreviousPage(): void {
    if (this.PageNumber > 0) {
      this.PageNumber--;
      this.GetLeadOntrackList();
    }
    this.EnablePageButton();
  }

  GoToNextPage(): void {
    if (this.PageNumber + 1 < this.TotalNumberOfPages) {
      this.PageNumber++;
      this.GetLeadOntrackList();
    }
    this.EnablePageButton();
  }

  callStatus(Id: number, TrackNumber: string): void {
    this.selectedLeadId = Id;
    this.selectedTrackNumber = TrackNumber;
    this.showLeadFormModel = true;

    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackNumber);
  }

  closeLeadFormModel(): void {
    this.showLeadFormModel = false;
  }
}
