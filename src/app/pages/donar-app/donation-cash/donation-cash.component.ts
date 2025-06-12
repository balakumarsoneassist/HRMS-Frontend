

import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown'; // ✅ Import this


@Component({
    selector: 'app-donation-cash',
    imports: [ TableModule,
        ButtonModule,
        TagModule,
        InputTextModule,DropdownModule,FormsModule,CommonModule],
    template: `<div class="card">
    <h2 class="title">Cash Donation</h2>

    <!-- Search Bar -->
    <div class="p-grid p-justify-between p-mb-3">
      <div class="p-col-6">
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <input
            type="text"
            pInputText
            [(ngModel)]="searchValue"
            placeholder="Search..."
          />
        </span>
      </div>
    </div>

    <!-- Table -->
    <p-table
      #dt
      [value]="cashDonations"
      [paginator]="true"
      [rows]="5"
      [globalFilterFields]="['receiptNo', 'name', 'email', 'amount']"
      [responsive]="true"
    >
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="receiptNo">Receipt No</th>
          <th pSortableColumn="name">Name</th>
          <th>Email</th>
          <th>Payment Image</th>
          <th pSortableColumn="mode">Mode</th>
          <th pSortableColumn="amount">Amount</th>
          <th>Details</th>
          <th>Action</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-donation>
        <tr>
          <td>{{ donation.receiptNo }}</td>
          <td>{{ donation.name }}</td>
          <td>{{ donation.email }}</td>
          <td>
            <img
              [src]="donation.paymentImage"
              alt="Payment Proof"
              width="50"
              height="50"
            />
          </td>
          <td>
            <span
              [ngClass]="{ 'text-success': donation.mode === 'Cash' }"
              >{{ donation.mode }}</span
            >
          </td>
          <td>Rs. {{ donation.amount }}</td>
          <td><button pButton label="View" class="p-button-info"></button></td>
          <td><button pButton label="Receipt" class="p-button-primary"></button></td>
        </tr>
      </ng-template>
    </p-table>
  </div>

`
})
export class DonationCashComponent
    {
        searchValue: string = '';

        cashDonations = [
          {
            receiptNo: 'VD/RCP-287',
            name: 'Achal Yadav',
            email: 'achal@gmail.com',
            paymentImage: 'assets/payment1.png',
            mode: 'Cash',
            amount: 1000,
          },
          {
            receiptNo: 'VD/RCP-288',
            name: 'Arjun Maurya',
            email: 'arjun@gmail.com',
            paymentImage: 'assets/payment2.png',
            mode: 'Cash',
            amount: 2000,
          },
          // Add more dummy data here...
        ];
    }

