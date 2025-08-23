import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';

type OccurrenceResponse = { dates?: string[]; items?: Array<{ date: string; name?: string }> };
type HolidayCheck = { isHoliday: boolean; name?: string };

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
  providers: [MessageService]
})
export class LeaveRequestComponent implements OnInit {
  leaveForm!: FormGroup;

  leaveTypes = [
    { label: 'Sick Leave', value: 'Sick Leave' },
    { label: 'Casual Leave', value: 'Casual Leave' },
    { label: 'Planned Leave', value: 'Planned Leave' },
    { label: 'Maternity Leave', value: 'Maternity Leave' },
    { label: 'Comp OFF', value: 'Comp OFF' }
  ];

  currentUserId = localStorage.getItem('userId') || 'user-id';

  // Holidays (disable + quick local guard)
  disabledDatesStart: Date[] = [];
  disabledDatesEnd: Date[] = [];
  private startHolidaySet = new Set<string>();
  private endHolidaySet = new Set<string>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      leaveType:  [null, Validators.required],
      startDate:  [null, Validators.required],
      endDate:    [null, Validators.required],
      reason:     ['', [Validators.required, Validators.minLength(5)]],
    });

    // Preload current month holidays for both calendars
    const now = new Date();
    this.loadMonthHolidays('start', now.getFullYear(), now.getMonth());
    this.loadMonthHolidays('end',   now.getFullYear(), now.getMonth());
  }

  // ---------- Submit ----------
  submitLeaveRequest() {
    if (this.leaveForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields' });
      return;
    }

    const start: Date = this.leaveForm.value.startDate;
    const end:   Date = this.leaveForm.value.endDate;

    if (end < start) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'End date cannot be before Start date' });
      return;
    }

    // Final guard (in case of race)
    if (this.isHolidayLocal('start', start) || this.isHolidayLocal('end', end)) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Dates', detail: 'Selected date falls on a holiday' });
      return;
    }

    const payload = {
      ...this.leaveForm.value,
      userId: this.currentUserId,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      status: 'Pending'
    };

    this.http.post('http://localhost:8080/api/leave', payload, { headers: this.authHeaders() }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Leave request submitted' });
        this.leaveForm.reset();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit leave request' });
      }
    });
  }

  // ---------- Calendar: month change ----------
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

  // ---------- Calendar: date select with API validation ----------
  onStartSelect(ev: any) {
    const date = this.extractDate(ev);
    if (!date) return;
    console.log(date);

    // quick local block (disabledDates) just in case
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
          // keep end calendar aligned with same month holidays
          this.loadMonthHolidays('end', date.getFullYear(), date.getMonth());
        }
      },
      error: () => {
        // on API error, optional fallback to local behavior
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
      params: { year: String(year), month: String(month) }
    }).subscribe({
      next: (res) => {
        const isoDates =
          (res && Array.isArray(res.dates)) ? res.dates :
          Array.isArray((res as any)) ? (res as any) : [];
        const arr = isoDates.map(iso => new Date(iso + 'T00:00:00'));
        if (target === 'start') {
          this.disabledDatesStart = arr;
          this.startHolidaySet = new Set(isoDates);
        } else {
          this.disabledDatesEnd = arr;
          this.endHolidaySet = new Set(isoDates);
        }
      },
      error: () => {
        if (target === 'start') { this.disabledDatesStart = []; this.startHolidaySet.clear(); }
        else { this.disabledDatesEnd = []; this.endHolidaySet.clear(); }
      }
    });
  }

  /** Server-side “is this date a holiday?” */
  private isHolidayServer(date: Date) {
    const iso = this.toISO(date);
    return this.http.get<HolidayCheck>(`http://localhost:8080/api/holidays/is-holiday`, {
      headers: this.authHeaders(),
      params: { date: iso }
    });
  }

  private isHolidayLocal(target: 'start' | 'end', date: Date | null): boolean {
    if (!date) return false;
    const iso = this.toISO(date);
    return target === 'start' ? this.startHolidaySet.has(iso) : this.endHolidaySet.has(iso);
  }

  // ---------- Utils ----------
  private extractDate(ev: any): Date | null {
    // PrimeNG may emit Date directly or { value: Date }
    const raw = ev instanceof Date ? ev : ev?.value ?? ev;
    if (!raw) return null;
    const dt = raw instanceof Date ? raw : new Date(raw);
    return isNaN(+dt) ? null : dt;
  }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({ 'Authorization': token ? `Bearer ${token}` : '' });
  }

  private toISO(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }
}
