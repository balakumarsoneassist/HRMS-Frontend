import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { EmployeeService } from '../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { CallTrackHistoryComponent } from '../call-track-history/call-track-history.component';
import { LeadFormModelComponent } from '../lead-form-model/lead-form-model.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-assigned-contacts',
  templateUrl: './assigned-contacts.component.html',
  styleUrls: ['./assigned-contacts.component.css'],
  providers: [MessageService,ConfirmationService],
  imports: [CommonModule,ReactiveFormsModule , FormsModule, CallTrackHistoryComponent, LeadFormModelComponent, ButtonModule,ToastModule, ConfirmDialogModule,DropdownModule,TableModule, DialogModule],

})
export class AssignedContactsComponent implements OnInit {
  filterForm!: FormGroup;
  ContactList: any[] = [];
  EmpList: any[] = [];
  StatusList: any[] = [];
  ContactListFilter: string = '';

  loading: boolean = false;
  TotalRecordNo = 0;
  PageNumber = 0;
  displayLeadForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private leadTrackService: LeadtrackService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      AssigneeName: [''],
      Status: ['']
    });

    this.loadEmployeeList();
    this.loadStatusList();

    this.leadTrackService.leadTrackSubjectObservable.subscribe({
      next: () => {
        this.getContactList();
      }
    });

    this.getContactList();
  }

  loadEmployeeList() {
    this.employeeService.GetAssigneeList().subscribe({
      next: (res) => {
        this.EmpList = res.map((x: string) => ({ label: x, value: x }));
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading employees' });
      }
    });
  }

  loadStatusList() {
    this.contactService.GetStatusList().subscribe({
      next: (res) => {
        this.StatusList = res.map((x: string) => ({ label: x, value: x }));
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading status list' });
      }
    });
  }

  getAssignedReport() {
    this.PageNumber = 0;
    this.getContactList();
  }

  onLazyLoad(event: any) {
    this.PageNumber = event.first / event.rows;
    this.getContactList();
  }

  onSearchChange() {
    this.PageNumber = 0;
    this.getContactList();
  }

  getContactList() {
    this.loading = true;
    const payload = {
      Status: this.filterForm.value.Status,
      AssigneeName: this.filterForm.value.AssigneeName,
      PageNumber: this.PageNumber,
      SearchText: this.ContactListFilter
    };

    this.contactService.GetContactList(payload).subscribe({
      next: (res) => {
        this.ContactList = res;
        if (this.ContactList.length) {
          this.TotalRecordNo = this.ContactList[0].TotalRows;
        } else {
          this.TotalRecordNo = 0;
        }
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading contacts' });
        this.loading = false;
      }
    });
  }

  AssignEmployee(Id: number, IsConnectorContact: boolean) {
    this.leadTrackService.AssignEmployeeToContact({
      LeadId: Id,
      IsConnectorContact,
      ContactFollowedBy: 1
    }).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact assigned' });
          this.getContactList();
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Assignment failed' });
      }
    });
  }

  callStatus(TrackId: string, Id: number) {
     this.displayLeadForm = true;
    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackId);
  }

  OpenTrackHistoryModel(TrackNumber: string) {
    this.contactService.SendLeadTrack(TrackNumber);
  }

  deleteRow(id: number) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this contact?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.ContactList = this.ContactList.filter(x => x.Id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Contact removed from view'
      });
    },
    reject: () => {
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelled',
        detail: 'Delete action cancelled'
      });
    }
  });
}

  onLeadFormClose() {
    this.displayLeadForm = false;
    // optionally reload the list:
    this.getContactList();
  }
}
