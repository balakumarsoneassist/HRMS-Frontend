import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../services/customer/customer.service';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CustomertrackComponent } from "../customertrack/customertrack.component";
import { CustservicetrackComponent } from "../custservicetrack/custservicetrack.component";

@Component({
  selector: 'app-mycustomers',
  standalone: true,
  templateUrl: './mycustomers.component.html',
  styleUrls: ['./mycustomers.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    CustomertrackComponent,
    CustservicetrackComponent,
    FormsModule,

  ],
  providers: [MessageService]
})
export class MycustomersComponent implements OnInit {
  customers: any[] = [];
  searchForm!: FormGroup;

  displayCustomerTrack = false;
  displayServiceTrack = false;

  selectedCustomer: any = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private trackService: CustomertrackService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchStr: ['']
    });
    this.loadCustomers();
  }

  get searchStr(): FormControl {
    return this.searchForm.get('searchStr') as FormControl;
  }

  loadCustomers() {
    this.customerService.getAssignedCustomerList().subscribe({
      next: (data) => {
        this.customers = data;
        console.log('Loaded customers', data);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load customers'
        });
      }
    });
  }

  openCustomerTrack(customer: any) {
    this.selectedCustomer = customer;
    this.displayCustomerTrack = true;
    this.trackService.SendCustomerid(customer.Id);
    this.trackService.SendCustomerTrack(customer.tracknumber);
  }

  callStatus(customer: any) {
    this.selectedCustomer = customer;
    this.displayServiceTrack = true;
    const tmp = `${customer.Id}**${customer.name}**${customer.mobilenumber}`;
    this.trackService.statusOpeningAcco();
    this.trackService.SendCustId(tmp);
  }
}
