


import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown'; // ✅ Import this
import { Router } from '@angular/router';


@Component({
  selector: 'app-certificate-active',

    imports: [ TableModule,
        ButtonModule,
        TagModule,
        InputTextModule,DropdownModule,FormsModule,CommonModule],
    template: `<div class="card">
    <h2 class="title">Active Certificate</h2>

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
      [value]="certificates"
      [paginator]="true"
      [rows]="5"
      [globalFilterFields]="['regNo', 'name', 'email', 'mobile', 'regDate', 'verifyDate', 'status']"
      responsiveLayout="scroll"
      class="custom-table"
    >
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="sno">S.No</th>
          <th pSortableColumn="regNo">Reg No / Name / Email / Mobile</th>
          <th pSortableColumn="regDate">Reg-Date</th>
          <th pSortableColumn="verifyDate">Verify-Date</th>
          <th>Details</th>
          <th pSortableColumn="status">Status</th>
          <th>Action</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-cert let-index="rowIndex">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>
            <strong>{{ cert.regNo }}</strong> / {{ cert.name }} /
            {{ cert.email }} / {{ cert.mobile }}
          </td>
          <td>{{ cert.regDate }}</td>
          <td>{{ cert.verifyDate }}</td>
          <td>
            <button pButton label="View" class="p-button-info"></button>
          </td>
          <td>
            <span class="status-badge active">{{ cert.status }}</span>
          </td>
          <td>
            <button (click)="generate(cert.name)" pButton label="Generate Now" class="p-button-primary"></button>

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

  .status-badge {
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
  }

  .active {
    background-color: #4caf50;
    color: white;
  }

  .p-datatable-wrapper {
    overflow-x: auto;
  }
   `
})
export class CertificateActiveComponent
{
    constructor(private router: Router) {}

searchValue: string = '';

certificates = [
  {
    regNo: 'MBR-365',
    name: 'ZaqFelxFUgWMWaK',
    email: 'kaelewilkin@gmail.com',
    mobile: '5876190262',
    regDate: 'Jan 21, 2025',
    verifyDate: 'Jan 21, 2025',
    status: 'Active',
  },
  {
    regNo: 'MBR-364',
    name: 'AbYvRWhzn',
    email: 'lavpateluj46@gmail.com',
    mobile: '498753328',
    regDate: 'Jan 21, 2025',
    verifyDate: 'Jan 21, 2025',
    status: 'Active',
  },
  {
    regNo: 'MBR-348',
    name: 'Achal Siddharth Yadav',
    email: 'ja.gobhratiye@gmail.com',
    mobile: '9792072100',
    regDate: 'Jan 21, 2025',
    verifyDate: 'Jan 21, 2025',
    status: 'Active',
  },
  {
    regNo: 'MBR-346',
    name: 'VEheHHOAcocm',
    email: 'yoltball34@gmail.com',
    mobile: '4713161476',
    regDate: 'Jan 21, 2025',
    verifyDate: 'Jan 21, 2025',
    status: 'Active',
  },
  {
    regNo: 'MBR-345',
    name: 'Shrikant',
    email: 'shreekntkr03@gmail.com',
    mobile: '876556668',
    regDate: 'Jan 21, 2025',
    verifyDate: 'Jan 21, 2025',
    status: 'Active',
  },
  {
    regNo: 'MBR-344',
    name: 'Arjun Maurya',
    email: 'arjunmaurya.cyber@gmail.com',
    mobile: '9026725217',
    regDate: 'Jan 21, 2025',
    verifyDate: 'Jan 21, 2025',
    status: 'Active',
  },
  {
    regNo: 'MBR-342',
    name: 'rushhAyiO',
    email: 'droeibtciaolvkq1e@yahoo.com',
    mobile: '6599413356',
    regDate: 'Jan 21, 2025',
    verifyDate: 'Jan 21, 2025',
    status: 'Active',
  },
];

generate(name: string) {
    this.router.navigate(['/app/cert', name]);
  }

}
