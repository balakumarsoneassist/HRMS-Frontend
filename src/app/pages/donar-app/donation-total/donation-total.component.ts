import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DonationService } from '../services/donation.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-donation-total',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    CommonModule,
    ButtonModule,

  ],
  template: `
    <div class="card">
      <div class="flex justify-between items-center mb-3 flex-wrap gap-2">

      <h2 class="text-center text-pink-600 text-2xl font-bold mb-4">Donation List</h2>
<div class="flex gap-2 flex-wrap">
          <button pButton label="Export Excel" icon="pi pi-file-excel" class="p-button-success" (click)="exportToExcel()"></button>
          <button pButton label="Export CSV" icon="pi pi-file" class="p-button-info" (click)="exportToCSV()"></button>
          <button pButton label="Export PDF" icon="pi pi-file-pdf" class="p-button-danger" (click)="exportToPDF()"></button>
        </div>
</div>
      <!-- Search Bar for Each Column -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        <input pInputText [(ngModel)]="filters.payment_id" placeholder="Payment ID" (input)="fetchDonations()" />
        <input pInputText [(ngModel)]="filters.amount" placeholder="Amount" (input)="fetchDonations()" />
        <input pInputText [(ngModel)]="filters.name" placeholder="Name" (input)="fetchDonations()" />
        <input pInputText [(ngModel)]="filters.email" placeholder="Email" (input)="fetchDonations()" />
        <input pInputText [(ngModel)]="filters.contact" placeholder="Contact" (input)="fetchDonations()" />
        <!-- <input pInputText [(ngModel)]="filters.method" placeholder="Method" (input)="fetchDonations()" /> -->
        <input pInputText [(ngModel)]="filters.status" placeholder="Status" (input)="fetchDonations()" />
        <input pInputText [(ngModel)]="filters.username" placeholder="Username" (input)="fetchDonations()" />
        <input pInputText [(ngModel)]="filters.registernumber" placeholder="Register No" (input)="fetchDonations()" />
        <!-- <input pInputText [(ngModel)]="filters.userStatus" placeholder="User Status" (input)="fetchDonations()" /> -->
          <p-dropdown [options]="methodOptions" [(ngModel)]="filters.method" placeholder="Select Method" (onChange)="fetchDonations()" optionLabel="label" optionValue="value" />
        <p-dropdown [options]="userStatusOptions" [(ngModel)]="filters.userStatus" placeholder="Select Status" (onChange)="fetchDonations()" optionLabel="label" optionValue="value" />
      </div>

      <!-- Donation Table -->
      <p-table [value]="donations" [paginator]="true" [rows]="limit" [totalRecords]="total"
               [lazy]="true" (onLazyLoad)="onPageChange($event)" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Method</th>
            <th>Status</th>
            <th>Username</th>
            <th>Register No</th>
            <th>User Status</th>
            <th>Created At</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-d>
          <tr>
            <td>{{ d.payment_id }}</td>
            <td>₹{{ d.amount }}</td>
            <td>{{ d.name }}</td>
            <td>{{ d.email }}</td>
            <td>{{ d.contact }}</td>
            <td>{{ d.method }}</td>
            <td [ngClass]="{'text-green-500 font-bold': d.status === 'captured', 'text-red-500': d.status !== 'captured'}">{{ d.status }}</td>
            <td>{{ d.username }}</td>
            <td>{{ d.registernumber }}</td>
            <td>{{ d.userStatus }}</td>
            <td>{{ d.created_at }}</td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr><td colspan="11" class="text-center">No donations found</td></tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class DonationTotalComponent implements OnInit {
  donations: any[] = [];
  total = 0;
  limit = 10;
  page = 1;
 methodOptions = [
    { label: 'UPI', value: 'upi' },
    { label: 'Card', value: 'card' }
  ];
  userStatusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Blocked', value: 'Blocked' }
  ];
  filters: any = {
    payment_id: '',
    amount: '',
    name: '',
    email: '',
    contact: '',
    method: '',
    status: '',
    username: '',
    registernumber: '',
    userStatus: ''
  };

  constructor(private donationService: DonationService) {}

  ngOnInit(): void {
    this.fetchDonations();
  }

  getSearchString(): string {
    const entries = Object.entries(this.filters)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${k}=${v}`);
    return entries.join(',');
  }

  fetchDonations(): void {
    const searchQuery = this.getSearchString();
    this.donationService.getAllDonations(this.page, this.limit, searchQuery).subscribe({
      next: (res) => {
        this.donations = res.data;
        this.total = res.total;
      },
      error: (err) => {
        console.error('Error fetching donations:', err);
      }
    });
  }

  onPageChange(event: any): void {
    this.page = Math.floor(event.first / event.rows) + 1;
    this.limit = event.rows;
    this.fetchDonations();
  }

   exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.donations);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsFile(excelBuffer, 'donations', 'xlsx');
  }

  exportToCSV() {
    const worksheet = XLSX.utils.json_to_sheet(this.donations);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, `donations_${new Date().getTime()}.csv`);
  }

  exportToPDF() {
    const doc = new jsPDF();
    const headers = [['Payment ID', 'Amount', 'Name', 'Email', 'Contact', 'Method', 'Status', 'User Status']];
    const rows = this.donations.map(d => [
      d.payment_id, d.amount, d.name, d.email, d.contact, d.method, d.status, d.userStatus
    ]);
    autoTable(doc, { head: headers, body: rows });
    doc.save(`donations_${new Date().getTime()}.pdf`);
  }

  private saveAsFile(buffer: any, fileName: string, extension: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.${extension}`);
  }
}
