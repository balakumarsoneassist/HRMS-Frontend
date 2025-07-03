import { Component, OnInit } from '@angular/core';
import { ReassignService } from '../services/reassignreport/reassignservice';
import { EmployeeService } from '../services/employee/employee.service';
import { ContactService } from '../services/contact/contact.service';
import { OtherInpModel, RejectbyModel } from '../model/report/dailyreport';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CallTrackHistoryComponent } from '../call-track-history/call-track-history.component';
import { LeadFormModelComponent } from '../lead-form-model/lead-form-model.component';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
  standalone: true,
  selector: 'app-reassign-otherlist',
  templateUrl: './reassign-otherlist.component.html',
  styleUrls: ['./reassign-otherlist.component.css'],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule,
    CallTrackHistoryComponent,
    LeadFormModelComponent,
    FormsModule,
    ReactiveFormsModule,
    SearchpipePipe
],
  providers: [MessageService]
})
export class ReassignOtherlistComponent implements OnInit {
  statusList: any[] = [];
  rejectList: any[] = [];
  empList: any[] = [];
  ownEmpList: any[] = [];
  searchStr = '';

  form!: FormGroup;
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
    this.form = this.fb.group({
      ownedBy: [0],
      reassignto: [0]
    });

    this.getContactOwnedByList();
    this.getEmpList();
  }

  getContactOwnedByList() {
    this.reassignService.getcownbyempList().subscribe({
      next: (res) => {
        this.ownEmpList = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading owned by employee list' });
      }
    });
  }

  getEmpList() {
    this.empService.GetActiveEmpList().subscribe({
      next: (res) => {
        this.empList = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading employees' });
      }
    });
  }

  getOtherReassignList() {
    const model: RejectbyModel = { empid: this.form.value.ownedBy };
    this.reassignService.getotherListReport(model).subscribe({
      next: (res) => {
        this.statusList = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching records' });
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

  toggleAll(ev: any) {
    const checked = ev.target.checked;
    this.statusList.forEach(item => item.checkstatus = checked);
    this.rejectList = checked ? this.statusList.map(x => x.id) : [];
  }

  isAllSelected() {
    return this.statusList.every(item => item.checkstatus === true);
  }

  toggleItem(id: any) {
    const index = this.rejectList.indexOf(id);
    if (index === -1) {
      this.rejectList.push(id);
    } else {
      this.rejectList.splice(index, 1);
    }
  }

  reassign() {
    const ownedBy = this.form.value.ownedBy;
    const reassignto = this.form.value.reassignto;

    if (ownedBy === reassignto) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Followed by and Assigned to cannot be the same' });
      return;
    }

    if (this.rejectList.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Select at least one record' });
      return;
    }

    const selvalues = this.rejectList.join(',');
    const model: OtherInpModel = {
      followedby: reassignto,
      selvalues
    };

    this.reassignService.reassignOtherRecords(model).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Records reassigned' });
          this.getOtherReassignList();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error reassigning records' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error' });
      }
    });
  }
}
