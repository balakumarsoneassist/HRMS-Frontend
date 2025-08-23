import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-petrolreimbursment',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './petrolreimbursment.component.html',
  providers: [MessageService, ConfirmationService]
})
export class PetrolReimbursmentComponent implements OnInit {
  claims: any[] = [];
  selectedClaims: any[] = [];
  claimDialog: boolean = false;

  transportModes = [
    { label: 'Public Transport', value: 'Public Transport' },
    { label: 'Private Transport', value: 'Private Transport' },
    { label: 'Own Transport', value: 'Own Transport' }
  ];

  claimList: any[] = [
    { amount: null, from: '', to: '', purposeofVisit: '', kms: null, modeoftransport: '', updatedAt: new Date() }
  ];

  userId: any = '6884d238fbb2351b8786d26f';

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || this.userId;
    this.getPetrolCredits(); // ✅ Load data on page load
  }

  // ✅ GET API to fetch current month's data
  getPetrolCredits() {
    this.http.get(`http://localhost:8080/api/petrol/mypetrolcredits?userId=${this.userId}`,
         { headers: { Authorization: `Bearer ${this.getToken()}` } }
    ).subscribe({
      next: (res: any) => {
        this.claims = res.data || [];
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch petrol credits' });
      }
    });
  }

  openNew() {
    this.claimList = [
      { amount: null, from: '', to: '', purposeofVisit: '', kms: null, modeoftransport: '', updatedAt: new Date() }
    ];
    this.claimDialog = true;
  }

  addRow() {
    this.claimList.push({ amount: null, from: '', to: '', purposeofVisit: '', kms: null, modeoftransport: '', updatedAt: new Date() });
  }

  removeRow(index: number) {
    if (this.claimList.length > 1) {
      this.claimList.splice(index, 1);
    }
  }

  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }

saveBulkClaims() {
  if (this.claimList.some(c =>
    !c.amount || !c.from || !c.to || !c.purposeofVisit || !c.modeoftransport || !c.updatedAt
  )) {
    this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Please fill all required fields.' });
    return;
  }

  // optional: ensure dates are real Date objects/ISO strings
  const records = this.claimList.map(r => ({
    ...r,
    updatedAt: r.updatedAt instanceof Date ? r.updatedAt : new Date(r.updatedAt)
  }));

  const payload = {
    userId: this.userId,
    records
  };

  // 🔐 send token
  this.http.post('http://localhost:8080/api/petrol/bulk-upload', payload,
      { headers: { Authorization: `Bearer ${this.getToken()}` } }).subscribe({
    next: (res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || 'Claims added successfully' });
      this.claimDialog = false;
      this.getPetrolCredits(); // refresh
    },
    error: () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add claims' });
    }
  });
}

}
