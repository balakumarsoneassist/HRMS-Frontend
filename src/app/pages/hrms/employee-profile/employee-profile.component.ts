import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

type AttendanceSummary = {
  presentDays: number;
  absentDays: number;
  lateMarks?: number;
  isHoliday?: boolean; // ✅ extended with holiday flag
};

type LeaveBalance = {
  type: string;
  balance: number;
  color?: string;
};

type Project = {
  name: string;
  role: string;
  status: 'Active' | 'On Hold' | 'Completed';
};

type EmployeeProfile = {
  _id: string;
  user_name: string;
  empId: string;
  email: string;
  mobile_no: string;
  position: string;
  department?: string;
  doj: string | Date;
  status: boolean;
  photoUrl?: string;
  coverUrl?: string;
  location?: string;
  managerName?: string;
  skills?: string[];
  bio?: string;
};

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    // PrimeNG
    CardModule, AvatarModule, ButtonModule, TagModule, ChipModule,
    DividerModule, TabViewModule, TableModule, ToastModule,
    DialogModule, PasswordModule
  ],
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  providers: [MessageService]
})
export class EmployeeProfileComponent implements OnInit {
  @Input() userId?: string;

  // signals
  private _profile = signal<EmployeeProfile | null>(null);
  profile = computed(() => this._profile());

  private _attendance = signal<AttendanceSummary | null>(null);
  attendance = computed(() => this._attendance());

  private _leaves = signal<LeaveBalance[]>([]);
  leaves = computed(() => this._leaves());

  private _projects = signal<Project[]>([]);
  projects = computed(() => this._projects());

  private _petrolBalance = signal<number>(0);
  petrolBalance = computed(() => this._petrolBalance());

  // UI state
  checkStatus = false; // true = clocked in
  loading = false;
  isHoliday: boolean = false; // ✅ added

  // change password dialog
  showChangePwd = false;
  submittingPwd = false;
  pwdForm!: FormGroup;

  fallbackAvatar = 'assets/img/avatar-placeholder.png';

  constructor(
    private http: HttpClient,
    private toast: MessageService,
    private fb: FormBuilder
  ) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  ngOnInit(): void {
    const id = this.userId || localStorage.getItem('userId') || '';
    if (!id) {
      this.toast.add({severity:'warn', summary:'Missing ID', detail:'No userId provided.'});
      return;
    }

    // init change password form
    this.pwdForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });

    // Profile
    this.http.get<EmployeeProfile>(
      `http://localhost:8080/api/user/${id}`,
      { headers: this.authHeaders() }
    ).subscribe({
      next: (data) => this._profile.set(data),
      error: () => this.toast.add({severity:'error', summary:'Error', detail:'Failed to load profile'})
    });

    // Attendance summary (with holiday info)
    this.http.get<AttendanceSummary>(
      `http://localhost:8080/api/attendance/summary/${id}`,
      { headers: this.authHeaders() }
    ).subscribe({
      next: (data) => {
        this._attendance.set(data); // ✅ set holiday flag
      },
      error: () => {
        this._attendance.set({ presentDays: 0, absentDays: 0, lateMarks: 0, isHoliday: false });
        this.isHoliday = false;
      }
    });

    // Leave balances
    this.http.get<Array<{label:string, value:number, color?:string}>>(
      `http://localhost:8080/api/leave-type/${id}`,
      { headers: this.authHeaders() }
    ).subscribe({
      next: (res) => {
        const mapped: LeaveBalance[] = (res || []).map(x => ({ type: x.label, balance: x.value, color: x.color }));
        this._leaves.set(mapped);
      },
      error: () => this._leaves.set([])
    });

    // Petrol balance
    this.http.get<any>(
      `http://localhost:8080/api/petrol/totalApproved/${id}`,
      { headers: this.authHeaders() }
    ).subscribe({
      next: (petrol) => this._petrolBalance.set(petrol?.totalAmount || 0),
      error: () => this._petrolBalance.set(0)
    });

    // Projects demo
    this._projects.set([
      { name: 'HRMS Portal', role: 'Frontend Dev', status: 'Active' },
      { name: 'CRM Revamp', role: 'Reviewer', status: 'On Hold' },
      { name: 'LeadTek POC', role: 'Contributor', status: 'Completed' },
    ]);

    // Initial clock status check
    this.refreshClockStatus();
  }

  private refreshClockStatus() {
    this.http.get<{message: boolean}>(
      `http://localhost:8080/api/attendance/present/check`,
      { headers: this.authHeaders() }
    ).subscribe({
      next: (res: any) => {this.checkStatus = !!res?.message,
         this.isHoliday = !!res?.isHoliday;
      },
      error: () => this.checkStatus = false
    });
  }

  clockIn() {
    if (this.loading) return;
    this.loading = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const payload = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          this.http.post(
            `http://localhost:8080/api/attendance/present/login`,
            payload,
            { headers: this.authHeaders() }
          ).subscribe({
            next: () => {
              this.checkStatus = true;
              this.toast.add({ severity: 'success', summary: 'Clock In', detail: 'You have clocked in successfully' });
              this.loading = false;
            },
            error: () => {
              this.toast.add({ severity: 'error', summary: 'Clock In Failed', detail: 'Unable to mark attendance' });
              this.loading = false;
            }
          });
        },
        () => {
          this.toast.add({ severity: 'warn', summary: 'Location Error', detail: 'Please enable GPS/location' });
          this.loading = false;
        }
      );
    } else {
      this.toast.add({ severity: 'warn', summary: 'Not Supported', detail: 'Geolocation not supported in this browser' });
      this.loading = false;
    }
  }

  clockOut() {
    if (this.loading) return;
    this.loading = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const payload = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          this.http.post(
            `http://localhost:8080/api/attendance/present/logout`,
            payload,
            { headers: this.authHeaders() }
          ).subscribe({
            next: () => {
              this.checkStatus = false;
              this.toast.add({ severity: 'success', summary: 'Clock Out', detail: 'You have clocked out successfully' });
              this.loading = false;
            },
            error: () => {
              this.toast.add({ severity: 'error', summary: 'Clock Out Failed', detail: 'Unable to mark attendance' });
              this.loading = false;
            }
          });
        },
        () => {
          this.toast.add({ severity: 'warn', summary: 'Location Error', detail: 'Please enable GPS/location' });
          this.loading = false;
        }
      );
    } else {
      this.toast.add({ severity: 'warn', summary: 'Not Supported', detail: 'Geolocation not supported in this browser' });
      this.loading = false;
    }
  }

  openChangePassword() {
    this.pwdForm.reset();
    this.showChangePwd = true;
  }

  private passwordsMatchValidator(group: FormGroup) {
    const n = group.get('newPassword')?.value;
    const c = group.get('confirmPassword')?.value;
    return n && c && n === c ? null : { mismatch: true };
  }

  submitChangePassword() {
    if (this.pwdForm.invalid) {
      this.pwdForm.markAllAsTouched();
      return;
    }
    this.submittingPwd = true;

    const { currentPassword, newPassword } = this.pwdForm.value;
    const body = { currentPassword, newPassword };

    this.http.post(
      'http://localhost:8080/api/auth/change-password',
      body,
      { headers: this.authHeaders() }
    ).subscribe({
      next: () => {
        this.toast.add({ severity: 'success', summary: 'Password updated', detail: 'Your password has been changed.' });
        this.submittingPwd = false;
        this.showChangePwd = false;
      },
      error: (err) => {
        const msg = err?.error?.message || 'Failed to change password';
        this.toast.add({ severity: 'error', summary: 'Error', detail: msg });
        this.submittingPwd = false;
      }
    });
  }

  coverStyle(): string {
    const url = this.profile()?.coverUrl;
    return url ? `url('${url}')` : `linear-gradient(135deg,#1f2937,#0ea5e9)`;
  }

  getProfilePhoto(): string {
    const url = this.profile()?.photoUrl;
    if (url && url.trim() !== '') return url;
    const safeName = encodeURIComponent(this.profile()?.user_name || 'Employee');
    return `https://ui-avatars.com/api/?name=${safeName}&background=random&size=64&bold=true`;
  }
}
