import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmssService } from '../../services/sms/smss.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ChipModule  } from 'primeng/chip';
import { TagInputComponent, TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-bulksms',
  standalone: true,
  templateUrl: './bulksms.component.html',
  styleUrls: ['./bulksms.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    ChipModule,
    FormsModule,
    TagInputModule
  ]
})
export class BulksmsComponent implements OnInit {
  smsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private smsservice: SmssService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.smsForm = this.fb.group({
      mobileNos: [[], Validators.required]
    });
  }

  SendSms() {
    if (this.smsForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please enter at least one mobile number'
      });
      return;
    }

    const mobileNosArray = this.smsForm.value.mobileNos;
    const concatenatedNumbers = mobileNosArray.join(',');

    const payload = { mobileNos: concatenatedNumbers };

    this.smsservice.sendBulkSms(payload).subscribe({
      next: res => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Message sent successfully!'
          });
          this.smsForm.reset();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Message sending failed'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'Something went wrong on the server'
        });
      }
    });
  }
}
