import { Component, OnInit } from '@angular/core';
import { SalesVisitService } from '../services/salesvisit/salesvisit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-salesvisitentry',
  templateUrl: './salesvisitentry.component.html',
  styleUrls: ['./salesvisitentry.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class SalesvisitentryComponent implements OnInit {
  form!: FormGroup;
  currentDateTime = new Date();

  constructor(
    private fb: FormBuilder,
    private objSalesService: SalesVisitService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      mobileno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      profession: [''],
      designation: [''],
      location: [''],
      distance: [''],
      notes: [''],
      dateofvisit: [null, Validators.required],
      nextvisit: [null],
      remarks: ['', Validators.required]
    });
  }

  saveSalesVisit() {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill all required fields'
      });
      return;
    }

    console.log('SalesVisit:', this.form.value);

    this.objSalesService.SaveSlesVisita(this.form.value).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Customer saved successfully'
          });
          this.saveHistory();
          this.form.reset();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Duplicate',
            detail: 'Mobile number already added'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not save customer'
        });
      }
    });
  }

  saveHistory() {
    const historyPayload = {
      Mobileno: this.form.value.mobileno,
      Dateofvisit: this.form.value.dateofvisit,
      Nextvisit: this.form.value.nextvisit,
      Remarks: this.form.value.remarks
    };
    this.objSalesService.SaveSalesVisithistory(historyPayload).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Visit history saved'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not save history'
        });
      }
    });
  }
}
