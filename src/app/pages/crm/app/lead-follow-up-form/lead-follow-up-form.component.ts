import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import {  MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'app-lead-follow-up-form',
  templateUrl: './lead-follow-up-form.component.html',
  styleUrls: ['./lead-follow-up-form.component.css'],
  imports: [CalendarModule, DropdownModule, CheckboxModule, ToastModule, ReactiveFormsModule,FormsModule,ButtonModule,InputTextModule],
  providers: [MessageService]
})
export class LeadFollowUpFormComponent implements OnInit {
  form!: FormGroup;
  statusOptions: any[] = [
    { label: 'Document Collection', value: 12 },
    { label: 'File Login', value: 13 },
    { label: 'Sanction', value: 15 },
    { label: 'Disbursement', value: 17 }
  ];
  dataStrengthOptions: any[] = [
    { label: 'Useful > 60%', value: 'Useful' },
    { label: 'Hold 20%-60%', value: 'Hold' },
    { label: 'Remove', value: 'Remove' }
  ];
  currentDateTime = new Date();

  constructor(private fb: FormBuilder, private messageService: MessageService) {

     this.form = this.fb.group({
      appointmentDate: [null, Validators.required],
      isDirectMeet: [false],
      notes: ['', Validators.required],
      status: [null, Validators.required],
      dataStrength: [null, Validators.required]
    });
  }

  ngOnInit(): void {

  }

  saveLeadTrack() {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation',
        detail: 'Please fill required fields'
      });
      return;
    }
    console.log('submitted data', this.form.value);
    // save to backend...
  }
}
