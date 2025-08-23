import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';

type OccurrenceResponse = { dates?: string[]; items?: Array<{ date: string; name?: string }> };
type HolidayCheck = { isHoliday: boolean; name?: string };

@Component({
  selector: 'app-attendance-managemnt',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    DatePickerModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    TabViewModule,
    FloatLabelModule,
    TextareaModule,
    TableModule
  ],
  templateUrl: './attendance-managemnt.component.html',
  styleUrl: './attendance-managemnt.component.scss',
  providers: [MessageService]
})
export class AttendanceManagemntComponent implements OnInit {
  tomorrow: Date = new Date();

  leaveForm!: FormGroup;
  leaveRequests: any[] = [];
  currentUserId: any = '';

  // Month-disabled dates + quick local guards
  disabledDatesStart: Date[] = [];
  disabledDatesEnd: Date[] = [];
  private startHolidaySet = new Set<string>();
  private endHolidaySet = new Set<string>();

  leaveTypes = [
    { label: 'Sick Leave', value: 'Sick Leave' },
    { label: 'Casual Leave', value: 'Casual Leave' },
    { label: 'Planned Leave', value: 'Planned Leave' },
    { label: 'Maternity Leave', value: 'Maternity Leave' },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // tomorrow as minimum selectable
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);

    this.currentUserId = localStorage.getItem('userId') || '';

    this.leaveForm = this.fb.group({
      leaveType: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]],
    });

    // preload disabled dates for current month
    const now = new Date();
    this.loadMonthHolidays('start', now.getFullYear(), now.getMonth());
    this.loadMonthHolidays('end',   now.getFullYear(), now.getMonth());

    this.getLeaveRequests();
  }

  // ---------- Submit ----------
  submitLeaveRequest() {
    if (this.leaveForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields' });
      return;
    }

    const start: Date = this.leaveForm.value.startDate;
    const end: Date   = this.leaveForm.value.endDate;

    if (end < start) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'End date cannot be before Start date' });
      return;
    }

    // final local guard
    if (this.isHolidayLocal('start', start) || this.isHolidayLocal('end', end)) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Dates', detail: 'Selected date falls on a holiday' });
      return;
    }

    const formatDate = (date: Date): string => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const payload = {
      attendanceType: this.leaveForm.value.leaveType,
      reasonForApplying: this.leaveForm.value.reason,
      fromDate: formatDate(start),
      toDate: formatDate(end),
      userId: this.currentUserId
    };

    this.http.post('http://localhost:8080/api/attendance/leaverequest', payload, { headers: this.authHeaders() })
      .subscribe({
        next: (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data?.message || 'Leave request submitted' });
          this.leaveForm.reset();
          this.getLeaveRequests(); // refresh table
        },
        error: (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Failed to submit leave request' });
        }
      });
  }

  // ---------- Fetch Leave Requests ----------
  getLeaveRequests() {
    const id = this.currentUserId;
    this.http.get<any>(`http://localhost:8080/api/attendance/all/${id}`, { headers: this.authHeaders() })
      .subscribe({
        next: (res: any) => {
          this.leaveRequests = res?.data || [];
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load leave requests' });
        }
      });
  }

  // ---------- Calendar handlers ----------
  onStartMonthChange(e: any) {
    const m = e?.month, y = e?.year;
    if (typeof m === 'number' && typeof y === 'number') {
      this.loadMonthHolidays('start', y, m);
    }
  }

  onEndMonthChange(e: any) {
    const m = e?.month, y = e?.year;
    if (typeof m === 'number' && typeof y === 'number') {
      this.loadMonthHolidays('end', y, m);
    }
  }

  onStartSelect(ev: any) {
    const date = this.extractDate(ev);
    if (!date) return;

    // quick local block
    if (this.isHolidayLocal('start', date)) {
      this.blockStartSelection(date, 'Holiday (cached)');
      return;
    }

    // authoritative server check
    this.isHolidayServer(date).subscribe({
      next: (res) => {
        if (res?.isHoliday) {
          this.blockStartSelection(date, res.name || 'Holiday');
        } else {
          // refresh End month holidays to selected start’s month
          this.loadMonthHolidays('end', date.getFullYear(), date.getMonth());
        }
      },
      error: () => {
        if (this.isHolidayLocal('start', date)) {
          this.blockStartSelection(date, 'Holiday');
        }
      }
    });
  }

  onEndSelect(ev: any) {
    const date = this.extractDate(ev);
    if (!date) return;

    if (this.isHolidayLocal('end', date)) {
      this.blockEndSelection(date, 'Holiday (cached)');
      return;
    }

    this.isHolidayServer(date).subscribe({
      next: (res) => {
        if (res?.isHoliday) {
          this.blockEndSelection(date, res.name || 'Holiday');
        }
      },
      error: () => {
        if (this.isHolidayLocal('end', date)) {
          this.blockEndSelection(date, 'Holiday');
        }
      }
    });
  }

  private blockStartSelection(date: Date, reason: string) {
    this.leaveForm.get('startDate')?.setValue(null);
    this.messageService.add({
      severity: 'warn',
      summary: 'Not allowed',
      detail: `Start date (${this.toISO(date)}) is ${reason}.`
    });
  }

  private blockEndSelection(date: Date, reason: string) {
    this.leaveForm.get('endDate')?.setValue(null);
    this.messageService.add({
      severity: 'warn',
      summary: 'Not allowed',
      detail: `End date (${this.toISO(date)}) is ${reason}.`
    });
  }

  // ---------- Holidays fetch/logic ----------
  private loadMonthHolidays(target: 'start' | 'end', year: number, month: number) {
    this.http.get<OccurrenceResponse>(`http://localhost:8080/api/holidays/occurrences`, {
      headers: this.authHeaders(),
      params: { year: String(year), month: String(month) } // month: 0..11
    }).subscribe({
      next: (res) => {
        const isoDates =
          (res && Array.isArray(res.dates)) ? res.dates :
          Array.isArray((res as any)) ? (res as any) : [];
        const dates = isoDates.map(iso => new Date(iso + 'T00:00:00'));
        if (target === 'start') {
          this.disabledDatesStart = dates;
          this.startHolidaySet = new Set(isoDates);
        } else {
          this.disabledDatesEnd = dates;
          this.endHolidaySet = new Set(isoDates);
        }
      },
      error: () => {
        if (target === 'start') { this.disabledDatesStart = []; this.startHolidaySet.clear(); }
        else { this.disabledDatesEnd = []; this.endHolidaySet.clear(); }
      }
    });
  }

  private isHolidayServer(date: Date) {
    const iso = this.toISO(date);
    return this.http.get<HolidayCheck>(`http://localhost:8080/api/holidays/is-holiday`, {
      headers: this.authHeaders(),
      params: { date: iso }
    });
  }

  // ---------- Utils ----------
  private extractDate(ev: any): Date | null {
    const raw = ev instanceof Date ? ev : ev?.value ?? ev;
    if (!raw) return null;
    const dt = raw instanceof Date ? raw : new Date(raw);
    return isNaN(+dt) ? null : dt;
    }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  private toISO(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }

  private isHolidayLocal(target: 'start' | 'end', date: Date | null): boolean {
    if (!date) return false;
    const iso = this.toISO(date);
    return target === 'start' ? this.startHolidaySet.has(iso) : this.endHolidaySet.has(iso);
  }
}
