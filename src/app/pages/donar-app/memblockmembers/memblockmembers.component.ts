

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AllUserDetailsService } from '../services/all-user-details.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-memblockmembers',
     standalone: true,
    providers: [MessageService],
    imports: [CommonModule,Toast, TableModule, ButtonModule, TagModule, InputTextModule, RouterModule, FormsModule],
    template: `
    <div class="card">
      <div class="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <h2 class="text-pink-600 text-2xl font-bold">Blocked Members</h2>
        <div class="flex gap-2 flex-wrap">
          <button pButton label="Export Excel" icon="pi pi-file-excel" class="p-button-success" (click)="exportToExcel()"></button>
          <button pButton label="Export CSV" icon="pi pi-file" class="p-button-info" (click)="exportToCSV()"></button>
          <button pButton label="Export PDF" icon="pi pi-file-pdf" class="p-button-danger" (click)="exportToPDF()"></button>
        </div>
      </div>

      <p-table
        [value]="blockedUsers"
        [lazy]="true"
        [paginator]="true"
        [rows]="limit"
        [first]="(page - 1) * limit"
        [totalRecords]="totalRecords"
        [rowsPerPageOptions]="[5, 10, 20]"
        [loading]="loading"
        (onLazyLoad)="loadUsersLazy($event)"
        [globalFilterFields]="['registernumber', 'name', 'email', 'mobilenumber']"
        responsiveLayout="scroll">

        <ng-template pTemplate="header">
           <tr>
                <th>S.no</th>
                <th>Reg No/ Name / Email/Mobile no
              <input pInputText type="text" (input)="onColumnFilter($event)" placeholder="Search..." class="p-inputtext-sm w-full mt-1" />

                </th>
                <th>Active-date</th>
                <th>Action</th>
                <th>Action</th>
            </tr>
        </ng-template>

        <ng-template pTemplate="body" let-member let-i="rowIndex">
          <tr>
            <td>{{ i + 1 + (page - 1) * limit }}</td>
                <td>
                    {{ member.regNo }} / {{ member.name }} / <br>
                    {{ member.email }} / {{ member.mobile }}
                </td>
                <td>{{ member.statusdate | date}}</td>

            <td><button pButton type="button" (click)="modifyUserStatus('Active', member.email)" label="Activate" class="p-button-secondary p-button-sm"></button></td>
            <td><button pButton type="button" label="View" [routerLink]="['/app/viewmember']"
                [queryParams]="{ email: getSerializedMember(member) }" class="p-button-success p-button-sm mr-1"></button></td>
          </tr>
        </ng-template>
      </p-table>
       <p-toast [showTransformOptions]="'translateY(100%)'" [showTransitionOptions]="'1000ms'" [hideTransitionOptions]="'1000ms'" [showTransformOptions]="'translateX(100%)'" [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }" />
    </div>
  `
})
export class MemblockmembersComponent implements OnInit {
    blockedUsers: any[] = [];
    totalRecords = 0;
    page = 1;
    limit = 10;
    loading = false;
    searchTerm: string = '';

    constructor(private allUserDetailsService: AllUserDetailsService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.loadUsers(this.page, this.limit);
    }

    loadUsers(page: number, limit: number, globalFilter: string = '') {

        this.loading = true;
        this.allUserDetailsService.getallUsers(page, limit, globalFilter,'Blocked').subscribe({
            next: (data: any) => {
                this.blockedUsers = data.data
                this.totalRecords = data.total;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load users', err);
                this.loading = false;
            }
        });
    }

    loadUsersLazy(event: any) {
        const page = Math.floor(event.first / event.rows) + 1;
        const limit = event.rows;
        this.page = page;
        this.limit = limit;
        this.loadUsers(this.page, this.limit, this.searchTerm);
    }

    onColumnFilter(event: any) {
        this.searchTerm = event.target.value;
        this.page = 1;
        this.loadUsers(this.page, this.limit, this.searchTerm);
    }

    getSerializedMember(member: any) {
        return JSON.stringify(member);
    }

    exportToExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.formatExportData());
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsFile(excelBuffer, 'blockedUsers', 'xlsx');
    }

    exportToCSV() {
        const worksheet = XLSX.utils.json_to_sheet(this.formatExportData());
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
        FileSaver.saveAs(blob, `blockedUsers_${new Date().getTime()}.csv`);
    }

    exportToPDF() {
        const doc = new jsPDF();
        const headers = [['Reg No', 'Name', 'Email', 'Mobile']];
        const rows = this.blockedUsers.map(m => [m.registernumber, m.name, m.email, m.mobilenumber]);
        autoTable(doc, { head: headers, body: rows });
        doc.save(`blockedUsers_${new Date().getTime()}.pdf`);
    }

    private saveAsFile(buffer: any, fileName: string, extension: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.${extension}`);
    }

    private formatExportData() {
        return this.blockedUsers.map(m => ({
            'Reg No': m.registernumber,
            'Name': m.name,
            'Email': m.email,
            'Mobile': m.mobilenumber
        }));
    }


    public modifyUserStatus(userStatus: string, username: string): void {
        this.allUserDetailsService.modifyUserStatus(username, userStatus).subscribe({
            next: (res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

                // Reload the list after 1 second
                setTimeout(() => {
                    this.loadUsers(this.page, this.limit, this.searchTerm);
                }, 1000);
            },
            error: (err: any) => {
                const errorMsg = err?.error?.message || 'Something went wrong while updating status';
                this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
            }
        });
    }


}
