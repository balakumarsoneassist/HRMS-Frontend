import { Component, OnInit } from '@angular/core';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { TrackSVCust } from '../model/salesvisit/salesvisit';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-custservicetrack-history',
  templateUrl: './custservicetrack-history.component.html',
  styleUrls: ['./custservicetrack-history.component.css'],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    ButtonModule
  ],
  providers: [MessageService]
})
export class CustservicetrackHistoryComponent implements OnInit {
  trackParameter: TrackSVCust = new TrackSVCust();
  customerTrackList: any[] = [];
  name!: string;
  mno!: string;

  constructor(
    private objCustSer: CustomertrackService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.objCustSer.custidSendObservable.subscribe((response) => {
      this.getServiceCallList(response);
    });
  }

  getServiceCallList(id: any) {
    const tmp = id.split('**');
    this.name = tmp[1];
    this.mno = tmp[2];
    this.trackParameter.Custid = tmp[0];
    this.objCustSer.GetServiceCallList(this.trackParameter).subscribe({
      next: (data) => {
        this.customerTrackList = data;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load service call history'
        });
      }
    });
  }
}
