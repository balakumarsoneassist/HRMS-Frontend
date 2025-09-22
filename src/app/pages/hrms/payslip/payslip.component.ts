import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar'; // ✅ Add PrimeNG Calendar
import { PayloadService } from '../services/payload/payload.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PayslipData {
  month: string;
  year: string;
  location: string;
  name: string;
  employeeId: string;
  designation: string;
  department: string;
  bankName: string;
  bankAccount: string;
  panNumber: string;
  effectiveWorkDays: number;
  lop: number;
  earnings: {
    dearnessAllowance: number;
    travelAllowance: number;
    basic: number;
    hra: number;
  };
  deductions: {
    pf: number;
    pt: number;
    tds: number;
  };
  totalEarnings: number;
  totalDeductions: number;
  netPay: number;
}

@Component({
  selector: 'app-payslip',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CalendarModule // ✅ Import calendar for month selection
  ],
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {
  selectedMonth: Date = new Date();
  payslipData: PayslipData | null = null;
  loading = false;

  constructor(private payloadService: PayloadService) {}

  ngOnInit(): void {}

  generatePayslip() {
    if (!this.selectedMonth) {
      alert('Please select a month');
      return;
    }

    const selectedMonthNumber = this.selectedMonth.getMonth(); // 0-based
    const selectedYear = this.selectedMonth.getFullYear();

    this.loading = true;
    this.payloadService.getPayloads().subscribe({
      next: (allPayloads: any[]) => {
        const filtered = allPayloads.filter(p => {
          if (!p.createdAt) return false;
          const createdAt = new Date(p.createdAt);
          return (
            createdAt.getMonth() === selectedMonthNumber &&
            createdAt.getFullYear() === selectedYear
          );
        });

        if (filtered.length > 0) {
          // Take the latest for that month
          const sortedPayloads = filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          );
          const selectedPayload = sortedPayloads[0];
          this.payslipData = this.convertToPayslipData(selectedPayload);
        } else {
          alert('No payroll data found for the selected month');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error generating payslip:', err);
        alert('Error loading payroll data');
        this.loading = false;
      }
    });
  }

  private convertToPayslipData(payload: any): PayslipData {
    const month = this.selectedMonth.toLocaleString('en-US', { month: 'long' });
    const year = this.selectedMonth.getFullYear().toString();

    const totalAllowances = this.getNumericValue(payload?.allowances || 0);
    const hraAmount = payload?.hrastatus ? totalAllowances : 0;
    const daAmount = payload?.dastatus ? totalAllowances : 0;

    const earnings = {
      basic: this.getNumericValue(payload?.basic_salary || 0),
      hra: hraAmount,
      dearnessAllowance: this.getNumericValue(payload?.dearness_allowance || 0),
      travelAllowance: this.getNumericValue(payload?.travel_allowance || 0)
    };

    const deductions = {
      pf: payload?.pfstatus ? this.getNumericValue(payload?.deductions || 0) : 0,
      pt: 0,
      tds: payload?.tdstatus ? this.getNumericValue(payload?.deductions || 0) : 0
    };

    const totalEarnings = this.getNumericValue(payload?.gross_salary || 0);
    const totalDeductions = this.getNumericValue(payload?.deductions || 0);
    const netPay = this.getNumericValue(payload?.net_salary || 0);

    return {
      month,
      year,
      location: payload?.location || 'Coimbatore',
      name: payload?.name || 'Employee',
      employeeId: payload?.employeeId || 'N/A',
      designation: payload?.designation || 'Employee',
      department: payload?.department || 'Department',
      bankName: payload?.bankName || '',
      bankAccount: payload?.bankAccount || '',
      panNumber: payload?.panNumber || '',
      effectiveWorkDays: 30,
      lop: 0,
      earnings,
      deductions,
      totalEarnings,
      totalDeductions,
      netPay
    };
  }

  private getNumericValue(value: any): number {
    if (value === null || value === undefined || value === '') return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  numberToWords(num: number): string {
    // (unchanged from your code)
    // ...
    return ''; // keep your existing logic
  }

  getEarningsArray() {
    if (!this.payslipData) return [];
    return [
      { label: 'Basic', amount: this.payslipData.earnings.basic },
      { label: 'HRA', amount: this.payslipData.earnings.hra },
      { label: 'Dearness Allowance', amount: this.payslipData.earnings.dearnessAllowance },
      { label: 'Travel Allowance', amount: this.payslipData.earnings.travelAllowance }
    ].filter(item => item.amount > 0);
  }

  getDeductionsArray() {
    if (!this.payslipData) return [];
    return [
      { label: 'PF', amount: this.payslipData.deductions.pf },
      { label: 'PT', amount: this.payslipData.deductions.pt },
      { label: 'TDS', amount: this.payslipData.deductions.tds }
    ].filter(item => item.amount > 0);
  }

  downloadPayslip() {
    const element = document.getElementById('payslip-content');
    if (!element) return;
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Payslip_${this.payslipData?.month}_${this.payslipData?.year}.pdf`);
    });
  }
}
