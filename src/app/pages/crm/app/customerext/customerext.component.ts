import { Component, OnInit } from '@angular/core';
import { ExtCustomerService } from '../services/extcustomer/extcustomer.service';
import { Extcustomer, TrackExtCust } from '../model/extcustomer/extcustomer';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-customerext',
  templateUrl: './customerext.component.html',
  styleUrls: ['./customerext.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule
  ]
})
export class CustomerextComponent implements OnInit {
  customerForm!: FormGroup;
  paraModel: TrackExtCust = new TrackExtCust();
  custdatalist: Extcustomer[] = [];

  constructor(
    private objExtCustService: ExtCustomerService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      Name: [{ value: '', disabled: true }, Validators.required],
      location: [''],
      loandate: [''],
      mobilenumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      product: [''],
      email: ['', [Validators.email]],
      bank: [''],
      amount: [''],
      roi: ['', Validators.required],
      tracknumber: [{ value: '', disabled: true }],
      notes: ['']
    });

    this.objExtCustService.ExtCutomerIdObservable.subscribe(response => {
      this.GetExtCustData(response);
    });
  }

  GetExtCustData(id: any) {
    this.paraModel.Id = id;
    this.objExtCustService.GetExtCustomer(this.paraModel).subscribe({
      next: (response) => {
        this.custdatalist = response;
        this.DataFill();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Server Error'
        });
      }
    });
  }

  updateData() {
    if (this.customerForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill all required fields correctly.'
      });
      return;
    }

    const updatedCustomer: Extcustomer = this.customerForm.getRawValue();

    this.objExtCustService.UpdateExtCustomer(updatedCustomer).subscribe({
      next: (response) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Customer data updated!'
          });
          this.CloseCustomerModel();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Update failed.'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'Something went wrong'
        });
      }
    });
  }

  DataFill() {
    if (!this.custdatalist || !this.custdatalist.length) return;

    const cust : any = this.custdatalist[0];

    const formattedDate : any = this.convertToDate(cust.loanDate);

    this.customerForm.patchValue({
      Name: cust.name,
      location: cust.location,
      loandate: formattedDate,
      mobilenumber: cust.mobilenumber,
      product: cust.product,
      email: cust.email,
      bank: cust.bank,
      amount: cust.amount,
      roi: cust.roi,
      tracknumber: cust.tracknumber,
      notes: cust.notes
    });
  }

  convertToDate(dt: string) {
    if (!dt) return '';
    const spData = dt.split('  ', 3);
    const mon = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    }[spData[0]] || '00';

    const spData1 = spData[1].split(' ', 2);
    const dd = spData1[0];
    const yyyy = spData1[1];

    return `${dd}/${mon}/${yyyy}`;
  }

  CloseCustomerModel() {
    const modal = document.querySelector('.callHistoryModel') as HTMLElement;
    if (modal) modal.removeAttribute('style');
  }
}
