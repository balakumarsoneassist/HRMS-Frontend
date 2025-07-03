import { Component, OnInit } from '@angular/core';
import { Servicefreq } from '../model/extcustomer/extcustomer';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../model/employee/employee';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CustservicetrackHistoryComponent } from "../custservicetrack-history/custservicetrack-history.component";

@Component({
  standalone: true,
  selector: 'app-custservicecall-freq',
  templateUrl: './custservicecall-freq.component.html',
  styleUrls: ['./custservicecall-freq.component.css'],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    CustservicetrackHistoryComponent
  ],
  providers: [MessageService]
})
export class CustservicecallFreqComponent implements OnInit {
  customerTrackList: any[] = [];
  trackForm: Servicefreq = new Servicefreq();
  objEmployeeModel!: Employee;
  adminRights: any;
  displayDialog: boolean = false;
  selectedCustomer: any = null;

  constructor(
    private objCustSer: CustomertrackService,
    private objEmpService: EmployeeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUserRights();
  }

  getUserRights() {
    this.objEmpService.GetEmployeeRights().subscribe({
      next: (res) => {
        this.objEmployeeModel = res[0];
        this.checkSplRights();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error getting user rights'
        });
      }
    });
  }

  checkSplRights() {
    this.adminRights = this.objEmployeeModel.IsAdminRights;
    this.trackForm.usertype = this.adminRights ? 'admin' : 'others';
    this.getServiceCallFreqList();
  }

  getServiceCallFreqList() {
    this.objCustSer.GetServiceCallfreq(this.trackForm).subscribe({
      next: (res) => {
        this.customerTrackList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load service call frequency'
        });
      }
    });
  }

  openCustomerHistory(customer: any) {
    this.selectedCustomer = customer;
    const tmp = `${customer.Id}**${customer.cname}**${customer.MobileNumber}`;
    this.objCustSer.statusOpeningAcco();
    this.objCustSer.SendCustId(tmp);
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
