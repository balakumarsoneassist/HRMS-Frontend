import { Component, OnInit } from '@angular/core';
import { ReassignService } from '../services/reassignreport/reassignservice';
import { EmployeeService } from '../services/employee/employee.service';
import { ContactService } from '../services/contact/contact.service';
import { RejectbyModel, RejectInpModel } from '../model/report/dailyreport';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CallTrackHistoryComponent } from '../call-track-history/call-track-history.component';
import { LeadFormModelComponent } from '../lead-form-model/lead-form-model.component';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
  standalone: true,
  selector: 'app-reassign-rejectlist',
  templateUrl: './reassign-rejectlist.component.html',
  styleUrls: ['./reassign-rejectlist.component.css'],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    CallTrackHistoryComponent,
    LeadFormModelComponent,
    FormsModule,
    SearchpipePipe,
    ReactiveFormsModule
],
  providers: [MessageService]
})
export class ReassignRejectlistComponent implements OnInit {
  statusList: any[] = [];
  rejectList: any[] = [];
  rejEmpList: any[] = [];
  empList: any[] = [];
  searchStr: string = '';

  fcForm!: FormGroup;
  displayLeadDialog = false;
  displayTrackDialog = false;

  constructor(
    private reassignService: ReassignService,
    private empService: EmployeeService,
    private contactService: ContactService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fcForm = this.fb.group({
      rejectedBy: [0],
      reassignto: [0]
    });

    this.getRejectedbylist();
    this.getEmpNameList();
  }

  getRejectList() {
    const empId = this.fcForm.value.rejectedBy;
    const model: RejectbyModel = { empid: empId };
    this.reassignService.getrejectListReport(model).subscribe({
      next: (res) => {
        this.statusList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error fetching rejected records'
        });
      }
    });
  }

  getRejectedbylist() {
    this.reassignService.getrejectbyempList().subscribe({
      next: (res) => {
        this.rejEmpList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error loading rejected by employee list'
        });
      }
    });
  }

  getEmpNameList() {
    this.empService.GetActiveEmpList().subscribe({
      next: (res) => {
        this.empList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error loading employees'
        });
      }
    });
  }

  callStatus(trackId: any, id: any) {
    this.contactService.SendLeadId(id);
    this.contactService.SendLeadTrack(trackId);
    this.displayLeadDialog = true;
  }

  openTrackHistory(trackNumber: string) {
    this.contactService.SendLeadTrack(trackNumber);
    this.displayTrackDialog = true;
  }

  closeLeadDialog() {
    this.displayLeadDialog = false;
  }

  closeTrackDialog() {
    this.displayTrackDialog = false;
  }

  isAllSelected() {
    return this.statusList.every(item => item.checkstatus === true);
  }

  toggleAll(ev: any) {
    const checked = ev.target.checked;
    this.statusList.forEach(item => item.checkstatus = checked);
    this.rejectList = checked ? this.statusList.map(x => x.id) : [];
  }

  toggleItem(val: any) {
    const index = this.rejectList.indexOf(val);
    if (index === -1) {
      this.rejectList.push(val);
    } else {
      this.rejectList.splice(index, 1);
    }
  }

  reassign() {
    const rejectedBy = this.fcForm.value.rejectedBy;
    const reassignto = this.fcForm.value.reassignto;

    if (rejectedBy === reassignto) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Rejected By and Reassign To cannot be the same'
      });
      return;
    }
    if (this.rejectList.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please select at least one record'
      });
      return;
    }
    const selvalues = this.rejectList.join(',');
    const input: RejectInpModel = {
      followedby: reassignto,
      selvalues
    };
    this.reassignService.reassignRecords(input).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Records reassigned'
          });
          this.getRejectList();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error while reassigning'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal server error'
        });
      }
    });
  }
}
