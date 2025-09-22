import { Component, Input, input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PayloadService } from '../services/payload/payload.service';

@Component({
  selector: 'app-payload',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    FloatLabelModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.scss']
})
export class PayloadComponent implements OnInit {
  @Input() empId : any = ""
  userForm!: FormGroup;
  currentUserId = '678b163cbffdb207e1d7c848'; // TODO: get from auth

  constructor(
    private payloadService: PayloadService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
console.log('Init userId from localStorage:', localStorage.getItem('userId'));
    this.userForm = new FormGroup({
      ctc: new FormControl('', [Validators.required, Validators.min(0)]),
      user_id: new FormControl('', Validators.required),
      basicEnabled: new FormControl(false),
      hraEnabled: new FormControl(false),
      daEnabled: new FormControl(false),
      taEnabled: new FormControl(false), // Allowances

      pfEnabled: new FormControl(false),
      pfPercent: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      ptEnabled: new FormControl(false),
      ptPercent: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      tdsEnabled: new FormControl(false),
      tdsPercent: new FormControl(0, [Validators.min(0), Validators.max(100)]), // Deductions
    });
  }

  onSubmit(): void {
    console.log('Form values before submit:', this.userForm.value);
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.'
      });
      return;
    }

    // ✅ Extract form values
    const formValue = {...this.userForm.value,createdBy: this.currentUserId,status: true};

    // ✅ Call service to send data to backend
    this.payloadService.createPayload(formValue).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Payload created successfully!'
        });
        this.userForm.reset();
      },
      error: (err) => {
        console.error('Create Payload Error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create payload. Please try again.'
        });
      }
    });
  }
}
