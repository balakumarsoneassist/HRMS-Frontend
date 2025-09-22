import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-loa',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, ButtonModule],
  templateUrl: './loa.component.html',
  styleUrls: ['./loa.component.scss']
})
export class LoaComponent {
  @ViewChild('letterContainer', { static: false }) letterContainer!: ElementRef;

  today = new Date();
  companyName = 'OneAssist';
  companyLogo = 'assets/oneassist-logo.png'; // Place actual logo here
  hrName = 'HR Team';
  hrTitle = 'Human Resources';
  hrContact = 'hr@oneassist.net';

  loaData = {
    user_name: 'BALAKUMAR',
    empId: 'OAID11011',
    designation: 'SENIOR ENGINEER',
    department: 'IT',
    doj: '2025-08-13T11:01:07.806Z',
    salary: '₹12,00,000 per annum',
    benefits: 'Health insurance, PF, Bonus, Paid leaves',
    workSchedule: 'Mon - Fri, 9:15 AM - 6:15 PM',
    reportingManager: 'Guru Sir',
    reportingTime: '9:15 AM',
    officeLocation: 'Chennai Office',
    address: 'Chennai, India'
  };

  templates = [
    { label: 'OneAssist Modern', value: 'modern' },
    { label: 'OneAssist Formal', value: 'formal' }
  ];

  selectedTemplate = 'modern';

  async downloadPDF() {
    const container = this.letterContainer.nativeElement;
    const canvas = await html2canvas(container, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Appointment_Letter_${this.loaData.user_name}.pdf`);
  }
}
