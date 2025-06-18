import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-on-track-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputTextModule,
    ToastModule,
    LeadFormModelComponent
],
  providers: [MessageService],

    templateUrl: './on-track-contact.component.html',
  styleUrls: ['./on-track-contact.component.css']
})
export class OnTrackContactComponent implements OnInit {
  ContactOnTrackList: any[] = [];
  PageNumber: number = 0;
  TotalNumberOfPages: number = 1;
  TotalRecordNo: number = 0;
  globalFilter: string = '';
  loadSpin: number = 0;

  _objPageModel: PaginationModel = new PaginationModel();
    showLeadFormModel: boolean = false ;

  constructor(
    private contactService: ContactService,
    private _objLeadTrackService: LeadtrackService,
    public loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.GetOntrackContactList(); // initial call
  }

  onLazyLoad(event: any): void {
    this.PageNumber = Math.floor(event.first / event.rows);
    this._objPageModel.PageNumber = this.PageNumber;
    this.GetOntrackContactList();
  }

  callStatus(Id: number, TrackNumber: string): void {
    console.log(Id,TrackNumber);

    this.contactService.statusOpeningAcco();
    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackNumber);
     this.showLeadFormModel = true;

  }

  GetOntrackContactList(): void {
    this.loadSpin = 1;
    this._objPageModel.PageNumber = this.PageNumber;

    this._objLeadTrackService.GetContactOntrack(this._objPageModel).subscribe({
      next: (response: any[]) => {
        console.log(response);

        this.ContactOnTrackList = response || [];
        this.loadSpin = 0;

        if (this.ContactOnTrackList.length === 0) {
          this.TotalRecordNo = 0;
          this.messageService.add({
            severity: 'info',
            summary: 'No Data',
            detail: 'No records found...!'
          });
          return;
        }

        this.TotalRecordNo = this.ContactOnTrackList[0].TotalRows;
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

   closeLeadFormModel(): void {
    this.showLeadFormModel = false;
  }

  logKey(event: KeyboardEvent) {
  console.log('Key pressed:', event?.target?.['value']);
}

}
