import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { LoaderService } from '../services/loader/loader.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-onreview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './onreview.component.html',
  styleUrls: ['./onreview.component.css']
})
export class OnreviewComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  ReviewList: any[] = [];
  loadSpin = false;
  globalFilter: string = '';

  constructor(
    private contactService: ContactService,
    private _objLeadTrackService: LeadtrackService,
    public loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.GetOnReviewList();
  }

  callStatus(Id: number, TrackNumber: string): void {

    this.contactService.statusOpeningAcco();
    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackNumber);
  }

  GetOnReviewList(): void {
    this.loadSpin = true;
    this._objLeadTrackService.GetReviewList().subscribe({
      next: (response: any[]) => {
        this.ReviewList = response || [];
        if (this.ReviewList.length === 0) {
          this.messageService.add({
            severity: 'info',
            summary: 'No Data',
            detail: 'No records found...!'
          });
        }
        this.loadSpin = false;
      },
      error: () => {
        this.loadSpin = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch review list.'
        });
      }
    });
  }
}
