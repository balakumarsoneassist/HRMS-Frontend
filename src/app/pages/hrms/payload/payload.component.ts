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

  // Total of *input* allowance % (for validation)
  totalPercent = 0;

  showPreview = false;
  salaryBreakdown: any[] = [];

  netSalarySummary:any | {
    gross: number;
    totalEmployeeDeductions: number;
    net: number;
    employerEsic: number;
    employerPf: number;
    employeePf: number;
    pt: number;
    tds: number;
    employeeEsic: number;
    configuredCtc: number;
    computedEmployerCost: number;
  } | null = null;

  currentUserId = '678b163cbffdb207e1d7c848'; // replace with logged-in user id

  constructor(
    private payloadService: PayloadService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      user_id: new FormControl({ value: this.empId, disabled: true }, Validators.required),

      // Monthly CTC (configured)
      ctc: new FormControl('', [Validators.required, Validators.min(0)]),

      // Allowances (percentages of Gross in effective calc)
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

      // PF – auto rule, no % in UI
      pfEnabled: new FormControl(false),

      // PT & TDS – percentage of CTC
      ptEnabled: new FormControl(false),
      ptPercent: new FormControl(0),
      tdsEnabled: new FormControl(false),
      tdsPercent: new FormControl(0),

      // ESIC toggles (0.75% & 3.25% of Gross)
      esicEmployerEnabled: new FormControl(false),
      esicEmployeeEnabled: new FormControl(false),

      // Duration
      createdMonth: new FormControl('', Validators.required),
      untilMonth: new FormControl('', Validators.required)
    });

    // Re-compute original allowance % total on any change
    this.userForm.valueChanges.subscribe(() => this.calculateTotalPercent());
  }

  // ✅ Sum of *input* allowance % (for validation only)
  calculateTotalPercent(): void {
    const val = this.userForm.value;
    const allowanceKeys = [
      'basic',
      'hra',
      'da',
      'ta',
      'conveyance',
      'medical',
      'special'
    ];

    this.totalPercent = 0;

    allowanceKeys.forEach(key => {
      if (val[`${key}Enabled`]) {
        this.totalPercent += Number(val[`${key}Percent`]) || 0;
      }
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
      detail: 'Allowance percentage must total exactly 100%.'
    });
    this.showPreview = false;
    return;
  }

  const ctc = Number(this.userForm.value.ctc);
  const val = this.userForm.value;

  // -------------------------------
  // STEP 1: EFFECTIVE % CALCULATION
  // -------------------------------
  const allowanceKeys = [
    'basic', 'hra', 'da', 'ta', 'conveyance', 'medical', 'special'
  ];

  const effectivePercent: Record<string, number> = {};
  const enabledKeys = allowanceKeys.filter(k => val[`${k}Enabled`]);

  if (enabledKeys.length === 0) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'At least one allowance must be enabled.'
    });
    return;
  }

  let basicInput = val.basicEnabled ? Number(val.basicPercent) || 0 : 0;

  if (!val.basicEnabled || basicInput <= 0) {
    basicInput = 40;
  }

  const otherKeys = enabledKeys.filter(k => k !== 'basic');
  const sumOthersInput = otherKeys.reduce((sum, k) =>
    sum + (Number(val[`${k}Percent`]) || 0), 0
  );

  if (sumOthersInput <= 0) {
    effectivePercent['basic'] = 100;
    otherKeys.forEach(k => (effectivePercent[k] = 0));
  } else if (basicInput >= 40) {
    effectivePercent['basic'] = basicInput;
    otherKeys.forEach(k => {
      effectivePercent[k] = Number(val[`${k}Percent`]) || 0;
    });
  } else {
    effectivePercent['basic'] = 40;
    const remaining = 60;
    otherKeys.forEach(k => {
      const orig = Number(val[`${k}Percent`]) || 0;
      effectivePercent[k] = (orig / sumOthersInput) * remaining;
    });
  }

  // -------------------------------
  // STEP 2: TEMP GROSS (your old iterative logic stays as is)
  // -------------------------------
  let gross = ctc;
  let prevGross = 0;
  const maxIterations = 50;

  let iteration = 0;
  while (Math.abs(gross - prevGross) > 1 && iteration < maxIterations) {
    iteration++;
    prevGross = gross;

    const basicFromGross = gross * (effectivePercent['basic'] || 0) / 100;

    const employeePfTemp = val.pfEnabled
      ? (basicFromGross > 15000 ? 1800 : basicFromGross * 0.12)
      : 0;

    const employeeEsicTemp = (gross < 21000 && val.esicEmployeeEnabled)
      ? gross * 0.0075
      : 0;

    const pt = val.ptEnabled ? (ctc * (Number(val.ptPercent) || 0) / 100) : 0;
    const tds = val.tdsEnabled ? (ctc * (Number(val.tdsPercent) || 0) / 100) : 0;

    const totalEmployeeDeductions = employeePfTemp + employeeEsicTemp + pt + tds;

    gross = ctc - totalEmployeeDeductions;
  }

  if (gross < 0) gross = 0;

  // -------------------------------
  // STEP 3: Allowance breakup
  // -------------------------------
  this.salaryBreakdown = [];
  this.netSalarySummary = null;

  let basicFinalOldGross = 0;

  const allowanceConfig = [
    { key: 'basic', label: 'Basic Salary' },
    { key: 'hra', label: 'House Rent Allowance (HRA)' },
    { key: 'da', label: 'Dearness Allowance (DA)' },
    { key: 'ta', label: 'Travel Allowance (TA)' },
    { key: 'conveyance', label: 'Conveyance Allowance' },
    { key: 'medical', label: 'Medical Reimbursement' },
    { key: 'special', label: 'Special Allowance' }
  ];

  allowanceConfig.forEach(a => {
    const pct = effectivePercent[a.key] || 0;

    if (pct > 0) {
      const amount = gross * (pct / 100);

      if (a.key === 'basic') basicFinalOldGross = amount;

      this.salaryBreakdown.push({
        component: a.label,
        percent: pct,
        monthly: amount,
        annual: amount * 12,
        type: "allowance"
      });
    }
  });

  // -------------------------------
  // STEP 4: TEMP PF/ESIC (just for old logic)
  // -------------------------------
  const employerPfTemp = val.pfEnabled
    ? (basicFinalOldGross > 15000 ? 1800 : basicFinalOldGross * 0.12)
    : 0;

  const employerEsicTemp = (gross < 21000 && val.esicEmployerEnabled)
    ? gross * 0.0325
    : 0;

  // -------------------------------
  // ⭐ STEP 5 — APPLY YOUR FORMULAS (NEW LOGIC)
  // -------------------------------

  // ⭐ 1: NEW GROSS FORMULA
  const grossFinal = ctc - (employerPfTemp + employerEsicTemp);

  // ⭐ 2: RECALCULATE BASIC FROM NEW GROSS
  const basicNew = grossFinal * (effectivePercent['basic'] / 100);

  // ⭐ 3: PF & ESIC RECALCULATED BASED ON NEW BASIC + NEW GROSS
  const employeePf = val.pfEnabled
    ? (basicNew > 15000 ? 1800 : basicNew * 0.12)
    : 0;

  const employerPf = val.pfEnabled
    ? (basicNew > 15000 ? 1800 : basicNew * 0.12)
    : 0;

  const employeeEsic =
    (val.esicEmployeeEnabled || val.esicEmployerEnabled) &&
    grossFinal < 21000
      ? grossFinal * 0.0075
      : 0;

  const employerEsic =
    val.esicEmployerEnabled && grossFinal < 21000
      ? grossFinal * 0.0325
      : 0;

  // ⭐ 4: NEW NET SALARY FORMULA
  const netSalary = grossFinal - (employeePf + employeeEsic);

  // -------------------------------
  // STEP 6: OUTPUT THE UPDATED VALUES
  // -------------------------------
  this.salaryBreakdown.push({
    component: "GROSS SALARY (Updated Formula)",
    percent: null,
    monthly: grossFinal,
    annual: grossFinal * 12,
    type: "total"
  });

  this.salaryBreakdown.push({
    component: "NET SALARY (Updated Formula)",
    percent: null,
    monthly: netSalary,
    annual: netSalary * 12,
    type: "total"
  });

  // Employer rows
  this.salaryBreakdown.push({
    component: "Employer PF (12%)",
    percent: null,
    monthly: employerPf,
    annual: employerPf * 12,
    type: "employer"
  });

  this.salaryBreakdown.push({
    component: "Employer ESIC (3.25%)",
    percent: null,
    monthly: employerEsic,
    annual: employerEsic * 12,
    type: "employer"
  });

  const totalEmployeeDeductions = employeePf + employeeEsic;

  const computedEmployerCost = grossFinal + totalEmployeeDeductions + employerPf + employerEsic;

  this.netSalarySummary = {
    gross: grossFinal,
    totalEmployeeDeductions,
    net: netSalary,
    employerEsic,
    employerPf,
    employeePf,
    employeeEsic,
    configuredCtc: ctc,
    computedEmployerCost
  };

  this.showPreview = true;
}




  // ✅ Submit config (still stores *input* percentages + flags)
  onSubmit(): void {
    if (this.userForm.invalid || this.totalPercent !== 100) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please ensure allowance total = 100% and all required fields are filled.'
      });
      return;
    }

    const form = this.userForm.value;

    const payload: any = {
      user_id: this.empId,
      ctc: form.ctc,

      // Allowances config (raw config)
      basic: { enabled: form.basicEnabled, percent: form.basicPercent },
      hra: { enabled: form.hraEnabled, percent: form.hraPercent },
      da: { enabled: form.daEnabled, percent: form.daPercent },
      ta: { enabled: form.taEnabled, percent: form.taPercent },
      conveyance: { enabled: form.conveyanceEnabled, percent: form.conveyancePercent },
      medical: { enabled: form.medicalEnabled, percent: form.medicalPercent },
      special: { enabled: form.specialEnabled, percent: form.specialPercent },

      // PF auto rule (no percent)
      pf: { enabled: form.pfEnabled, mode: 'auto_12_or_1800' },

      // PT & TDS config
      pt: { enabled: form.ptEnabled, percent: form.ptPercent },
      tds: { enabled: form.tdsEnabled, percent: form.tdsPercent },

      // ESIC config
      esicEmployer: { enabled: form.esicEmployerEnabled },
      esicEmployee: { enabled: form.esicEmployeeEnabled },

      totalAllowancePercent: this.totalPercent,
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
        this.netSalarySummary = null;
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
