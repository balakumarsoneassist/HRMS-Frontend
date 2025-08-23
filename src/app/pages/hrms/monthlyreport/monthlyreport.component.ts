import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AttendanceService } from '../services/attendance/attendance.service';

@Component({
  selector: 'app-monthlyreport',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule
  ],
  templateUrl: './monthlyreport.component.html',
  styleUrl: './monthlyreport.component.scss',
  providers: [MessageService]
})
export class MonthlyreportComponent implements OnInit {
  attendanceList: any[] = [];
  total: number = 0;
  limit: number = 10;
  loading = false;
  searchText: string = '';

  approvalDialog: boolean = false;
  selectedAttendance: any = null;

  constructor(private attendanceService: AttendanceService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadAttendance({ page: 0, rows: this.limit });
  }

  loadAttendance(event: any) {
    this.loading = true;
    const page = event.page !== undefined ? event.page + 1 : 1;

    this.attendanceService.getMonthlyreport(page, this.limit, this.searchText).subscribe({
      next: (res) => {
        this.attendanceList = res.data;
        this.total = res.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.loadAttendance({ page: 0, rows: this.limit });
  }

  openApprovalDialog(attendance: any) {
    this.selectedAttendance = attendance;
    this.approvalDialog = true;
  }

approveAttendance() {
  if (!this.selectedAttendance || !this.selectedAttendance._id) return;

  this.attendanceService.approveAttendance(this.selectedAttendance._id, true).subscribe({
    next: () => {
      this.selectedAttendance.approved = true;
      this.messageService.add({
        severity: 'success',
        summary: 'Approved',
        detail: 'Attendance approved successfully'
      });
      this.approvalDialog = false;
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to approve attendance'
      });
    }
  });
}

rejectAttendance() {
  if (!this.selectedAttendance || !this.selectedAttendance._id) return;

  this.attendanceService.approveAttendance(this.selectedAttendance._id, false).subscribe({
    next: () => {
      this.selectedAttendance.approved = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'Rejected',
        detail: 'Attendance rejected'
      });
      this.approvalDialog = false;
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to reject attendance'
      });
    }
  });
}

}
