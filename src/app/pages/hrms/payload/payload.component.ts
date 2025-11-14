import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { PayloadService } from '../services/payload/payload.service';
@Component({
  selector: 'app-payload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    FloatLabelModule,
    ToastModule,
    TableModule
  ],
  providers: [MessageService],
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.scss']
})
export class PayloadComponent implements OnInit {
  @Input() empId: any = '';
  userForm!: FormGroup;
  totalPercent = 0;
  showPreview = false;
  salaryBreakdown: any[] = [];
  currentUserId = '678b163cbffdb207e1d7c848'; // Replace with logged-in user ID

  constructor(
    private payloadService: PayloadService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      user_id: new FormControl({ value: this.empId, disabled: true }, Validators.required),
      ctc: new FormControl('', [Validators.required, Validators.min(0)]),
      // Allowances
      basicEnabled: new FormControl(false),
      basicPercent: new FormControl(0),
      hraEnabled: new FormControl(false),
      hraPercent: new FormControl(0),
      daEnabled: new FormControl(false),
      daPercent: new FormControl(0),
      taEnabled: new FormControl(false),
      taPercent: new FormControl(0),
      conveyanceEnabled: new FormControl(false),
      conveyancePercent: new FormControl(0),
      medicalEnabled: new FormControl(false),
      medicalPercent: new FormControl(0),
      specialEnabled: new FormControl(false),
      specialPercent: new FormControl(0),

      // Deductions
      pfEnabled: new FormControl(false),
      pfPercent: new FormControl(0),
      ptEnabled: new FormControl(false),
      ptPercent: new FormControl(0),
      tdsEnabled: new FormControl(false),
      tdsPercent: new FormControl(0),

      // Duration fields
      createdMonth: new FormControl('', Validators.required),
      untilMonth: new FormControl('', Validators.required)
    });

    this.userForm.valueChanges.subscribe(() => this.calculateTotalPercent());
  }

  calculateTotalPercent(): void {
    const val = this.userForm.value;
    this.totalPercent = 0;

    [
      'basic', 'hra', 'da', 'ta', 'conveyance',
      'medical', 'special', 'pf', 'pt', 'tds'
    ].forEach(key => {
      if (val[`${key}Enabled`]) this.totalPercent += Number(val[`${key}Percent`]) || 0;
    });
  }

  onCalculatePreview(): void {
    if (!this.userForm.get('ctc')?.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please enter CTC before calculating.'
      });
      return;
    }

    if (this.totalPercent !== 100) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Total Allowance + Deduction percentage must be 100%.'
      });
      this.showPreview = false;
      return;
    }

    const ctc = Number(this.userForm.get('ctc')?.value);
    const val = this.userForm.value;
    this.salaryBreakdown = [];

    const allowanceKeys = [
      'basic', 'hra', 'da', 'ta', 'conveyance', 'medical', 'special'
    ];
    const deductionKeys = ['pf', 'pt', 'tds'];

    allowanceKeys.concat(deductionKeys).forEach(key => {
      if (val[`${key}Enabled`]) {
        const pct = Number(val[`${key}Percent`]);
        const monthly = (ctc * pct) / 100;
        this.salaryBreakdown.push({
          component: key.toUpperCase(),
          percent: pct,
          monthly,
          annual: monthly * 12,
          type: deductionKeys.includes(key) ? 'deduction' : 'allowance'
        });
      }
    });

    const totalMonthly = this.salaryBreakdown.reduce((sum, c) => sum + c.monthly, 0);
    this.salaryBreakdown.push({
      component: 'TOTAL (CTC)',
      percent: this.totalPercent,
      monthly: totalMonthly,
      annual: totalMonthly * 12,
      type: 'total'
    });

    this.showPreview = true;
  }

  onSubmit(): void {
    if (this.userForm.invalid || this.totalPercent !== 100) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please ensure total = 100% and all required fields are filled.'
      });
      return;
    }

    const form = this.userForm.value;

    const payload = {
      user_id: this.empId,
      ctc: form.ctc,
      basic: { enabled: form.basicEnabled, percent: form.basicPercent },
      hra: { enabled: form.hraEnabled, percent: form.hraPercent },
      da: { enabled: form.daEnabled, percent: form.daPercent },
      ta: { enabled: form.taEnabled, percent: form.taPercent },
      conveyance: { enabled: form.conveyanceEnabled, percent: form.conveyancePercent },
      medical: { enabled: form.medicalEnabled, percent: form.medicalPercent },
      special: { enabled: form.specialEnabled, percent: form.specialPercent },
      pf: { enabled: form.pfEnabled, percent: form.pfPercent },
      pt: { enabled: form.ptEnabled, percent: form.ptPercent },
      tds: { enabled: form.tdsEnabled, percent: form.tdsPercent },
      totalPercent: this.totalPercent,
      createdMonth: form.createdMonth,
      untilMonth: form.untilMonth,
      createdBy: this.currentUserId,
      status: true
    };

    this.payloadService.createPayload(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Saved',
          detail: 'Salary structure saved successfully.'
        });
        this.userForm.reset();
        this.totalPercent = 0;
        this.showPreview = false;
      },
      error: (err) => {
        console.error('Save Error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save salary structure.'
        });
      }
    });
  }
}
