import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

type Policy = {
  _id?: string;
  role: string;
  label:
    | 'Sick Leave'
    | 'Casual Leave'
    | 'Planned Leave'
    | 'Maternity Leave'
    | 'Paternity Leave'
    | 'Compoff Leave';
  amount: number; // days
  accrualType: 'monthly' | 'annual' | 'fixed';
};

@Component({
  selector: 'app-leave-policy-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    TableModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './leave-policy-admin.component.html',
  styleUrls: ['./leave-policy-admin.component.scss'],
  providers: [MessageService],
})
export class LeavePolicyAdminComponent implements OnInit {
  // API bases
  basePolicyUrl = 'http://localhost:8080/api/leave-policies';

  // roles come from leave policy collection (distinct)
  policyRoles: string[] = [];
  selectedRoleName = '';

  // existing policies for selected role
  policies: Policy[] = [];

  // multiple new rows staged before saving
  newRows: Policy[] = [];

  // form options
  labels: Policy['label'][] = [
    'Sick Leave',
    'Casual Leave',
    'Planned Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Compoff Leave',
  ];
  accrualTypes: Policy['accrualType'][] = ['monthly', 'annual', 'fixed'];

  // add role inline
  newRoleName = '';

  constructor(private http: HttpClient, private toast: MessageService) {}

  ngOnInit(): void {
    this.loadPolicyRoles();
  }

  private authHeaders() {
    const token = localStorage.getItem('authToken') || '';
    return { Authorization: `Bearer ${token}` };
  }

  // Load distinct roles from LeavePolicy
  loadPolicyRoles() {
    this.http
      .get<string[]>(`${this.basePolicyUrl}/roles`, { headers: this.authHeaders() })
      .subscribe({
        next: (res) => {
          this.policyRoles = (res || []).sort((a, b) => a.localeCompare(b));
        },
        error: () =>
          this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load policy roles' }),
      });
  }

  // When a role is selected, load its policies
  onRoleChange() {
    if (!this.selectedRoleName) {
      this.policies = [];
      this.newRows = [];
      return;
    }
    const params = new HttpParams().set('role', this.selectedRoleName);
    this.http
      .get<Policy[]>(this.basePolicyUrl, { params, headers: this.authHeaders() })
      .subscribe({
        next: (res) => {
          this.policies = res || [];
          this.newRows = [];
        },
        error: () =>
          this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load policies' }),
      });
  }

  // Add a new role locally (becomes real once policies are saved)
  addRole() {
    const role = (this.newRoleName || '').trim();
    if (!role) return;

    const exists = this.policyRoles.find((r) => r.toLowerCase() === role.toLowerCase());
    if (!exists) {
      this.policyRoles = [...this.policyRoles, role].sort((a, b) => a.localeCompare(b));
    }
    this.selectedRoleName = exists || role;
    this.policies = [];
    this.newRows = [];
    this.newRoleName = '';
  }

  // ----- New policies (multi-add) -----
  addNewRow() {
    if (!this.selectedRoleName) return;
    this.newRows.push({
      role: this.selectedRoleName,
      label: 'Sick Leave',
      amount: 1,
      accrualType: 'monthly',
    });
  }

  removeNewRow(i: number) {
    this.newRows.splice(i, 1);
  }

  saveAllNew() {
    if (!this.newRows.length) return;
    const headers = this.authHeaders();
    let done = 0,
      failed = 0;

    const next = () => {
      const row = this.newRows.shift();
      if (!row) {
        this.toast.add({
          severity: failed ? 'warn' : 'success',
          summary: 'Save complete',
          detail: `Added ${done}, failed ${failed}`,
        });
        this.onRoleChange(); // refresh policies table
        this.loadPolicyRoles(); // refresh distinct roles (in case this was a brand-new role)
        return;
      }
      const body = {
        role: row.role,
        label: row.label,
        amount: Number(row.amount),
        accrualType: row.accrualType,
      };
      this.http.post<{ data: Policy }>(this.basePolicyUrl, body, { headers }).subscribe({
        next: () => {
          done++;
          next();
        },
        error: (e) => {
          failed++;
          next();
        },
      });
    };

    next();
  }

  // ----- Existing policies -----
  saveExisting(row: Policy) {
    if (!row._id) return;
    const body: Partial<Policy> = {
      role: row.role,
      label: row.label,
      amount: Number(row.amount),
      accrualType: row.accrualType,
    };
    this.http
      .put<{ data: Policy }>(`${this.basePolicyUrl}/${row._id}`, body, { headers: this.authHeaders() })
      .subscribe({
        next: (res) => {
          // update local row
          const idx = this.policies.findIndex((p) => p._id === row._id);
          if (idx >= 0 && res?.data) this.policies[idx] = res.data;
          this.policies = [...this.policies];
          this.toast.add({ severity: 'success', summary: 'Saved', detail: 'Policy updated' });
        },
        error: (e) => {
          const msg = e?.error?.message || 'Update failed';
          this.toast.add({ severity: 'error', summary: 'Error', detail: msg });
        },
      });
  }

  deletePolicy(row: Policy) {
    if (!row._id) return;
    this.http
      .delete(`${this.basePolicyUrl}/${row._id}`, { headers: this.authHeaders() })
      .subscribe({
        next: () => {
          this.policies = this.policies.filter((p) => p._id !== row._id);
          this.toast.add({ severity: 'success', summary: 'Deleted', detail: 'Policy removed' });
        },
        error: () =>
          this.toast.add({ severity: 'error', summary: 'Error', detail: 'Delete failed' }),
      });
  }
}
