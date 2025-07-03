import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer/customer.service';
import { ExtCustomerService } from '../services/extcustomer/extcustomer.service';
import { TrackExtCust } from '../model/extcustomer/extcustomer';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CustomerextComponent } from '../customerext/customerext.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
  imports: [
    CommonModule,
    CustomerextComponent,
    TableModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
  ],
  providers: [MessageService],
})
export class CustomerlistComponent implements OnInit {
  customers: any[] = [];
  searchForm!: FormGroup;
  selectedCustomer: any = null;
  displayDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private extCustomerService: ExtCustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchStr: ['']
    });
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomerList().subscribe({
      next: (data) => {
        this.customers = data;
        console.log('Customers loaded', data);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load customer list'
        });
      }
    });
  }

  openCustomerModal(customer: any) {
    this.selectedCustomer = customer;
    this.extCustomerService.SendExtCustomer(customer.Id);
    this.displayDialog = true;
  }

  closeCustomerModal() {
    this.displayDialog = false;
    this.selectedCustomer = null;
  }

  assignToMe(customer: any) {
    const model = new TrackExtCust();
    model.Id = customer.Id;
    this.extCustomerService.AssignCustomerToEmp(model).subscribe({
      next: (response) => {
        if (response === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Assigned',
            detail: 'Customer assigned successfully'
          });
          this.loadCustomers();
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Assignment failed'
        });
      }
    });
  }

  get searchStr(): FormControl {
  return this.searchForm.get('searchStr') as FormControl;
}
}
