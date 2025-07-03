import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

@Component({
  standalone: true,
  selector: 'app-custservicetrack-entry',
  templateUrl: './custservicetrack-entry.component.html',
  styleUrls: ['./custservicetrack-entry.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    DialogModule,
    FormsModule
  ],
  providers: [MessageService]
})
export class CustservicetrackEntryComponent implements OnInit {
  serviceForm!: FormGroup;
  custid!: number;
  currentDateTime = new Date();
  displayDialog = false;

  constructor(
    private fb: FormBuilder,
    private customerTrackService: CustomertrackService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      nextcall: [null, Validators.required],
      callattend: [null, Validators.required],
      remarks: ['', Validators.required],
    });

    this.customerTrackService.custidSendObservable.subscribe((response) => {
      const tmpid = response.split('**');
      this.custid = +tmpid[0];
      this.displayDialog = true;
    });
  }

  saveHistory() {
    const model = this.serviceForm.value;
    model.Id = this.custid;

    this.customerTrackService.SaveServiceCallhistory(model).subscribe({
      next: (response) => {
        if (response === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Saved successfully'
          });
          this.closeDialog();
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to save history'
        });
      }
    });
  }

  closeDialog() {
    this.displayDialog = false;
    this.serviceForm.reset();
  }
}
