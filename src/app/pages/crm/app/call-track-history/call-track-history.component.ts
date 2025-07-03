import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { TrackIdModel } from '../model/lead/lead-model';
import { Employee } from '../model/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-call-track-history',
  standalone: true,
  templateUrl: './call-track-history.component.html',
  styleUrls: ['./call-track-history.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToastModule,
    PaginatorModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule
  ],
  providers: [MessageService]
})
export class CallTrackHistoryComponent implements OnInit {
  LeadTrackList: any[] = [];
  trackParameter: TrackIdModel = new TrackIdModel();
  leadcrname = '';
  searchCallOn = '';
  searchAppointmentDate = '';
  searchNotes = '';
  searchStatus = '';

  first = 0;
  rows = 10;

  constructor(
    private contactService: ContactService,
    private empService: EmployeeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contactService.LeadTrackIdObservable.subscribe(trackId => {
      this.GetLeadTrackHistoryList(trackId);
    });
  }

  GetLeadTrackHistoryList(TrackId: string): void {
    this.trackParameter.TrackId = TrackId;
    this.contactService.GetLeadTrackHistoryList(this.trackParameter).subscribe({
      next: response => {
        this.LeadTrackList = response;
        this.CheckLeadOwner();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' });
      }
    });
  }

  CheckLeadOwner(): void {
    for (const entry of this.LeadTrackList) {
      if (entry?.Status === 'leadunassigned') {
        this.getLeadcreator(entry.ContactFollowby);
        break;
      }
    }
  }

  getLeadcreator(empId: string): void {
    this.empService.GetEmployeeById(empId).subscribe({
      next: response => {
        if (response?.[0]) {
          this.leadcrname = response[0].Name;
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Can't retrieve lead creator" });
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
