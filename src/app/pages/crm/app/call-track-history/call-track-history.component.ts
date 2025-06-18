import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { TrackIdModel } from '../model/lead/lead-model';
import { Employee } from '../model/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';
import { MessageService } from 'primeng/api';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-call-track-history',
  templateUrl: './call-track-history.component.html',
  styleUrls: ['./call-track-history.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class CallTrackHistoryComponent implements OnInit {
  LeadTrackList: any[] = [];
  trackParameter: TrackIdModel = new TrackIdModel();
  leadcreator: string = "";
  model: Employee = new Employee();
  leadcrname: any = "";

  constructor(
    private service: ContactService,
    private empService: EmployeeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.service.LeadTrackIdObservable.subscribe(response => {
        console.log("dhdh",response);

      this.GetLeadTrackHistoryList(response);
    });
  }

  GetLeadTrackHistoryList(TrackId: string): void {
    this.trackParameter.TrackId = TrackId;
    this.service.GetLeadTrackHistoryList(this.trackParameter).subscribe({
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
        this.leadcreator = entry.ContactFollowby;
        break;
      }
    }

    if (this.leadcreator) {
      this.getLeadcreator();
    }
  }

  getLeadcreator(): void {
    this.empService.GetEmployeeById(this.leadcreator).subscribe({
      next: response => {
        if (response?.[0]) {
          this.model = response[0];
          this.leadcrname = this.model.Name;
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Can't retrieve lead creator" });
      }
    });
  }
}
