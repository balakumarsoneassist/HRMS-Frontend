


import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown'; // ✅ Import this

interface Visitor {
    certificateNo: string;
    regNo: string;
    email: string;
    mobile: string;
    fatherName: string;
    programName: string;
  }
@Component({
  selector: 'app-certificate-visitor',


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
    <p-table [value]="visitors" [paginator]="true" [rows]="5" [sortMode]="'multiple'" [resizableColumns]="true">
  <ng-template pTemplate="header">
    <tr>
      <th pSortableColumn="certificateNo">Certificate No <p-sortIcon field="certificateNo"></p-sortIcon></th>
      <th pSortableColumn="regNo">Reg No <p-sortIcon field="regNo"></p-sortIcon></th>
      <th>Email</th>
      <th>Mobile</th>
      <th pSortableColumn="fatherName">Father Name <p-sortIcon field="fatherName"></p-sortIcon></th>
      <th pSortableColumn="programName">Program <p-sortIcon field="programName"></p-sortIcon></th>
      <th>Actions</th>
    </tr>
  </ng-template>

  <ng-template pTemplate="body" let-visitor let-i="rowIndex">
    <tr>
      <td>{{ visitor.certificateNo }}</td>
      <td>{{ visitor.regNo }}</td>
      <td>{{ visitor.email }}</td>
      <td>{{ visitor.mobile }}</td>
      <td>{{ visitor.fatherName }}</td>
      <td>{{ visitor.programName }}</td>
      <td>
        <button pButton type="button" label="Download" icon="pi pi-download" class="p-button-success p-button-sm" (click)="downloadCertificate(visitor)"></button>
        <button pButton type="button" label="Delete" icon="pi pi-trash" class="p-button-danger p-button-sm" (click)="deleteVisitor(i)"></button>
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
export class CertificateVisitorComponent
{
searchValue: string = '';

visitors: Visitor[] = [
    { certificateNo: 'VD/RCP-287', regNo: 'MBR-365', email: 'kaelewilkin@gmail.com', mobile: '5876190262', fatherName: 'Suresh', programName: 'Social' },
    { certificateNo: 'VD/RCP-287', regNo: 'MBR-364', email: 'lyopateluj46@gmail.com', mobile: '493873328', fatherName: 'Ramesh', programName: 'Church' },
    { certificateNo: 'VD/RCP-287', regNo: 'MBR-348', email: 'goharvijte@gmail.com', mobile: '9792072100', fatherName: 'Aravind', programName: 'Camp' },
    { certificateNo: 'VD/RCP-287', regNo: 'MBR-346', email: 'yoltball34@gmail.com', mobile: '417134167', fatherName: 'Gowtham', programName: 'Activity' },
    { certificateNo: 'VD/RCP-287', regNo: 'MBR-345', email: 'shreekantkr03@gmail.com', mobile: '876556668', fatherName: 'Arasan', programName: 'Functions' }
  ];

  deleteVisitor(index: number) {
    this.visitors.splice(index, 1);
  }

  downloadCertificate(visitor: Visitor) {
    alert(`Downloading certificate for ${visitor.regNo}`);
  }
}
