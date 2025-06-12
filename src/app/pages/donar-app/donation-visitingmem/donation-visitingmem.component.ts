
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown'; // ✅ Import this


@Component({
    selector: 'app-donation-visitingmem',
    imports: [ TableModule,
        ButtonModule,
        TagModule,
        InputTextModule,DropdownModule,FormsModule,CommonModule],
    template: `<p-table #dt [value]="visitorDonations" [paginator]="true" [rows]="10" [rowsPerPageOptions]="[10, 25, 50]" [globalFilterFields]="['receiptNo', 'regNo', 'email', 'transactionId', 'amount']">

    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="receiptNo">Receipt No <p-sortIcon field="receiptNo"></p-sortIcon></th>
            <th pSortableColumn="regNo">Reg No <p-sortIcon field="regNo"></p-sortIcon></th>
            <th>Email / Mobile No</th>
            <th pSortableColumn="transactionId">Transaction ID <p-sortIcon field="transactionId"></p-sortIcon></th>
            <th pSortableColumn="donate">Donate <p-sortIcon field="donate"></p-sortIcon></th>
            <th pSortableColumn="amount">Amount <p-sortIcon field="amount"></p-sortIcon></th>
            <th>Details</th>
            <th>Action</th>
        </tr>

        <tr>
        <th><input pInputText type="text" (input)="applyFilter($event, 'receiptNo')" placeholder="Search Receipt"></th>

            <th><input pInputText type="text" (input)="applyFilter($event, 'receiptNo')" placeholder="Search Receipt"></th>
            <th><input pInputText type="text" (input)="applyFilter($event, 'regNo')" placeholder="Search Reg No"></th>
            <th><input pInputText type="text" (input)="applyFilter($event, 'email')" placeholder="Search Email"></th>
            <th><input pInputText type="text" (input)="applyFilter($event, 'transactionId')" placeholder="Search Transaction"></th>
            <th></th>
            <th><input pInputText type="text" (input)="applyFilter($event, 'amount')" placeholder="Search Amount"></th>
            <th></th>
            <th></th>
        </tr>
    </ng-template>

    <ng-template pTemplate="body" let-donation>
        <tr>
            <td>{{ donation.receiptNo }}</td>
            <td>{{ donation.regNo }}</td>
            <td>{{ donation.email }} / {{ donation.mobile }}</td>
            <td>{{ donation.transactionId }}</td>
            <td>
                <span [ngClass]="{'text-success': donation.donate === 'Online', 'text-danger': donation.donate === 'Offline'}">
                    {{ donation.donate }}
                </span>
            </td>
            <td>Rs. {{ donation.amount }}</td>
            <td><button pButton type="button" label="View" class="p-button-info"></button></td>
            <td><button pButton type="button" label="Receipt" class="p-button-primary"></button></td>
        </tr>
    </ng-template>

</p-table>

`
})
export class DonationVisitingmemComponent
    {
        visitorDonations = [
            { receiptNo: 'VD/RCP-287', regNo: 'MBR-365', email: 'kaelewilkin@gmail.com', mobile: '5876190262', transactionId: '64erbgsdSiyo99877', donate: 'Online', amount: 1000 },
            { receiptNo: 'VD/RCP-287', regNo: 'MBR-364', email: 'lavpateluja6@gmail.com', mobile: '4983733328', transactionId: '64erbgsdSiyo99877', donate: 'Offline', amount: 1000 },
            { receiptNo: 'VD/RCP-287', regNo: 'MBR-348', email: 'jagobhartiye@gmail.com', mobile: '9792072100', transactionId: '64erbgsdSiyo99877', donate: 'Online', amount: 1000 },
            { receiptNo: 'VD/RCP-287', regNo: 'MBR-346', email: 'yoltball3l4@gmail.com', mobile: '4171316476', transactionId: '64erbgsdSiyo99877', donate: 'Offline', amount: 1000 },
            { receiptNo: 'VD/RCP-287', regNo: 'MBR-345', email: 'shreekantkr03@gmail.com', mobile: '8765566668', transactionId: '64erbgsdSiyo99877', donate: 'Online', amount: 1000 },
            { receiptNo: 'VD/RCP-287', regNo: 'MBR-344', email: 'arjunmaurya.cyber@gmail.com', mobile: '9026725217', transactionId: '64erbgsdSiyo99877', donate: 'Offline', amount: 1000 },
            { receiptNo: 'VD/RCP-287', regNo: 'MBR-342', email: 'droeibtcaioavkq1e@yahoo.com', mobile: '6599413365', transactionId: '64erbgsdSiyo99877', donate: 'Online', amount: 1000 }
        ];
    dt: any;

        applyFilter(event: Event, field: string) {
            const filterValue = (event.target as HTMLInputElement).value;
            this.dt.filter(filterValue, field, 'contains');
        }
    }
