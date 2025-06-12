


import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown'; // ✅ Import this


@Component({
  selector: 'app-receipt-active',
    imports: [ TableModule,
        ButtonModule,
        TagModule,
        InputTextModule,DropdownModule,FormsModule,CommonModule],
    template: `<div class="card">
    <h2 class="title">Active Receipt</h2>

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
      [value]="activeReceipts"
      [paginator]="true"
      [rows]="5"
      [globalFilterFields]="['receiptNo', 'memberId', 'memberName', 'transactionId', 'date', 'amount']"
      responsiveLayout="scroll"
      class="custom-table"
    >
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="sno">S.No</th>
          <th pSortableColumn="receiptNo">Receipt No</th>
          <th pSortableColumn="memberId">Member ID</th>
          <th pSortableColumn="memberName">Member Name</th>
          <th pSortableColumn="transactionId">Transaction ID</th>
          <th pSortableColumn="date">Date</th>
          <th pSortableColumn="donate">Donate</th>
          <th pSortableColumn="amount">Amount</th>
          <th>Details</th>
          <th>Action</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-receipt let-index="rowIndex">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ receipt.receiptNo }}</td>
          <td>{{ receipt.memberId }}</td>
          <td>{{ receipt.memberName }}</td>
          <td>{{ receipt.transactionId }}</td>
          <td>{{ receipt.date }}</td>
          <td>
            <span
              [ngClass]="{'online': receipt.donate === 'Online', 'offline': receipt.donate === 'Offline'}"
            >
              {{ receipt.donate }}
            </span>
          </td>
          <td>Rs. {{ receipt.amount }}</td>
          <td>
            <button pButton label="View" class="p-button-info"></button>
          </td>
          <td>
            <button pButton label="Receipt" class="p-button-primary"></button>
          </td>
        </tr>
      </ng-template>
    </p-table>
  </div>

`,
styles:`.title {
    text-align: center;
    font-size: 24px;
    color: #8e44ad;
    margin-bottom: 20px;
  }

  .custom-table {
    width: 100%;
  }

  .online {
    color: green;
    font-weight: bold;
  }

  .offline {
    color: red;
    font-weight: bold;
  }

  .p-datatable-wrapper {
    overflow-x: auto;
  }
  `
})
export class ReceiptActiveComponent
    {
        searchValue: string = '';

        activeReceipts = [
          {
            receiptNo: 'VD/RCP-287',
            memberId: 'MBR213',
            memberName: 'Ananya',
            transactionId: '64erbgsd5yio99877',
            date: '10-2-2023',
            donate: 'Online',
            amount: 1000,
          },
          {
            receiptNo: 'VD/RCP-287',
            memberId: 'MBE234',
            memberName: 'Aadhvik',
            transactionId: '64erbgsd5yio99877',
            date: '10-5-2024',
            donate: 'Offline',
            amount: 1000,
          },
          {
            receiptNo: 'VD/RCP-287',
            memberId: 'MBR456',
            memberName: 'Raju',
            transactionId: '64erbgsd5yio99877',
            date: '3-3-2023',
            donate: 'Online',
            amount: 1000,
          },
          {
            receiptNo: 'VD/RCP-287',
            memberId: 'MBT567',
            memberName: 'Renuka',
            transactionId: '64erbgsd5yio99877',
            date: '2-4-2024',
            donate: 'Offline',
            amount: 1000,
          },
          {
            receiptNo: 'VD/RCP-287',
            memberId: 'MBT456',
            memberName: 'Midula',
            transactionId: '64erbgsd5yio99877',
            date: '2-4-2024',
            donate: 'Online',
            amount: 1000,
          },
          {
            receiptNo: 'VD/RCP-287',
            memberId: 'MTRE45',
            memberName: 'Karunya',
            transactionId: '64erbgsd5yio99877',
            date: '13-6-2023',
            donate: 'Online',
            amount: 1000,
          },
          {
            receiptNo: 'VD/RCP-287',
            memberId: 'MNT564',
            memberName: 'Lavanya',
            transactionId: '64erbgsd5yio99877',
            date: '11-10-2024',
            donate: 'Online',
            amount: 1000,
          },
        ];

    }

