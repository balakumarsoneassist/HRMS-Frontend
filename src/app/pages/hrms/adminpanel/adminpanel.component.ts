import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { EmployeeProfileComponent } from "../employee-profile/employee-profile.component";

type ProfileTile = { label: string; value: number | string; color?: string };

@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    PasswordModule,
    ToastModule,
    ReactiveFormsModule,
    EmployeeProfileComponent
  ],
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss'],
  providers: [MessageService]
})
export class AdminpanelComponent implements OnInit {
  totalEmployees = 0;
  activeEmployees = 0;
  inactiveEmployees = 0;
  presentToday = 0;
  absentToday = 0;

  profile: any = null;
  profileStats = {
    availableLeaves: 0,
    presentDays: 0,
    absentDays: 0,
    pendingLeaves: 0,
    balancePetrol: 0,
    lastLogin: ''
  };

  profileTiles: ProfileTile[] = [];

  userRole: string = '';
  isAdminOrSuperAdmin = false;

  checkstatus: boolean = false;
  logoutTime: boolean = false;
  loading = false;

  // Change password dialog
  showChangePassword = false;
  changeForm!: FormGroup;
  savingPwd = false;

  private tileColorMap: Record<string, string> = {
    'Available Leaves': 'text-green-600',
    'Present Days (This Month)': 'text-blue-500',
    'Absent Days': 'text-red-500',
    'Pending Leave Requests': 'text-orange-500',
    'Casual Leave': 'text-green-600',
    'Sick Leave': 'text-red-500',
    'Earned Leave': 'text-blue-500'
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.userRole = localStorage.getItem('userRole') || '';
    this.isAdminOrSuperAdmin = this.userRole === 'Super Admin';

    // build change password form
    this.changeForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            // at least 1 upper, 1 lower, 1 digit, 1 special
            this.passwordStrengthValidator()
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.matchPasswordsValidator('newPassword', 'confirmPassword') }
    );

    if (this.isAdminOrSuperAdmin) {
      this.getDashboardStats();
    } else {
      this.getProfileData();
    }

    const logoutTime = new Date();
    this.logoutTime = logoutTime.getHours() >= 17;

    await this.check();
  }

  // ---------- Admin dashboard ----------
  getDashboardStats() {
    this.http.get<any>('http://localhost:8080/api/dashboard/stats').subscribe({
      next: (data) => {
        this.totalEmployees = data.totalEmployees;
        this.activeEmployees = data.activeEmployees;
        this.inactiveEmployees = data.inactiveEmployees;
        this.presentToday = data.presentToday;
        this.absentToday = data.absentToday;
      },
      error: () => console.error('Failed to fetch dashboard stats')
    });
  }

  // ---------- Profile view ----------
  getProfileData() {
    const id = localStorage.getItem('userId');
    if (!id) {
      console.error('User ID is missing');
      return;
    }

    this.http.get<any>(`http://localhost:8080/api/user/${id}`).subscribe({
      next: (data) => {
        this.profile = data;
        this.profileStats.availableLeaves = data.availableLeaves;
        this.profileStats.presentDays = data.presentDays;
        this.profileStats.absentDays = data.absentDays;
        this.profileStats.pendingLeaves = data.pendingLeaves;
        this.profileStats.lastLogin = data.lastLogin;

        this.getPetrolBalance(id);
        this.getProfileTiles(id);
      },
      error: () => console.error('Failed to fetch profile')
    });
  }

  getProfileTiles(id: string) {
    this.http.get<ProfileTile[]>(`http://localhost:8080/api/leave-type/${id}`).subscribe({
      next: (res) => {
        this.profileTiles = Array.isArray(res) ? res : [];
      },
      error: () => {
        this.profileTiles = [
          { label: 'Available Leaves', value: this.profileStats.availableLeaves },
          { label: 'Present Days (This Month)', value: this.profileStats.presentDays },
          { label: 'Absent Days', value: this.profileStats.absentDays },
          { label: 'Pending Leave Requests', value: this.profileStats.pendingLeaves }
        ];
      }
    });
  }

  getPetrolBalance(id: string) {
    this.http.get<any>(`http://localhost:8080/api/petrol/totalApproved/${id}`).subscribe({
      next: (petrolData) => {
        this.profileStats.balancePetrol = petrolData.totalAmount || 0;
      },
      error: () => {
        console.error('Failed to fetch petrol total for this month');
        this.profileStats.balancePetrol = 0;
      }
    });
  }

  // ---------- Attendance buttons ----------
  login() {
    if (this.loading) return;
    this.loading = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const payload = { lat: position.coords.latitude, lon: position.coords.longitude };
          this.http.post(`http://localhost:8080/api/attendance/present/login`, payload).subscribe({
            next: () => {
              this.checkstatus = true;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Attendance marked successfully' });
              this.loading = false;
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to mark attendance' });
              this.loading = false;
            }
          });
        },
        () => {
          this.messageService.add({ severity: 'warn', summary: 'Location Error', detail: 'Unable to fetch location. Please enable GPS.' });
          this.loading = false;
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Geolocation Not Supported', detail: 'Your browser does not support location services.' });
      this.loading = false;
    }
  }

  logout() {
    if (this.loading) return;
    this.loading = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const payload = { lat: position.coords.latitude, lon: position.coords.longitude };
          this.http.post(`http://localhost:8080/api/attendance/present/logout`, payload).subscribe({
            next: () => {
              this.checkstatus = false;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Attendance marked successfully' });
              this.loading = false;
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to mark attendance' });
              this.loading = false;
            }
          });
        },
        () => {
          this.messageService.add({ severity: 'warn', summary: 'Location Error', detail: 'Unable to fetch location. Please enable GPS.' });
          this.loading = false;
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Geolocation Not Supported', detail: 'Your browser does not support location services.' });
      this.loading = false;
    }
  }

  async check(): Promise<void> {
    if (this.loading) return;
    this.loading = true;

    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            this.http.get(`http://localhost:8080/api/attendance/present/check`).subscribe({
              next: (res: any) => {
                this.checkstatus = res.message;
                this.loading = false;
                resolve();
              },
              error: () => {
                this.loading = false;
                resolve();
              }
            });
          },
          () => {
            this.loading = false;
            resolve();
          }
        );
      } else {
        this.loading = false;
        resolve();
      }
    });
  }

  // ---------- Change password ----------
  openChangePassword() {
    this.changeForm.reset();
    this.showChangePassword = true;
  }

  submitChangePassword() {
    if (this.changeForm.invalid) {
      this.changeForm.markAllAsTouched();
      return;
    }
    const { currentPassword, newPassword } = this.changeForm.value;
    this.savingPwd = true;

    this.http.post(
      'http://localhost:8080/api/users/change-password',
      { currentPassword, newPassword },
      { headers: this.authHeaders() }
    ).subscribe({
      next: () => {
        this.savingPwd = false;
        this.showChangePassword = false;
        this.messageService.add({ severity: 'success', summary: 'Password Updated', detail: 'Your password has been changed.' });
      },
      error: (err) => {
        this.savingPwd = false;
        const detail = err?.error?.message || 'Failed to change password';
        this.messageService.add({ severity: 'error', summary: 'Error', detail });
      }
    });
  }

  // ---------- Validators & helpers ----------
  private passwordStrengthValidator() {
    // Require: at least 1 lowercase, 1 uppercase, 1 digit, 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const v = String(control.value || '');
      if (!v) return null;
      return regex.test(v) ? null : { weak: true };
    };
  }

  private matchPasswordsValidator(p1: string, p2: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const a = group.get(p1)?.value;
      const b = group.get(p2)?.value;
      if (!a || !b) return null;
      return a === b ? null : { mismatch: true };
    };
  }

  touched(name: string) {
    const c = this.changeForm.get(name);
    return !!(c && (c.touched || c.dirty));
    }
  invalid(name: string) {
    const c = this.changeForm.get(name);
    return !!(c && c.invalid);
  }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  // ---------- misc ----------
  getColorClass(label: string): string {
    return this.tileColorMap[label] || '';
  }

  trackByLabel = (_: number, t: ProfileTile) => t.label;
}
