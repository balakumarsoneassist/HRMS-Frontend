import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-attendance-report',
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
  templateUrl: './attendance-report.component.html',
  styleUrl: './attendance-report.component.scss',
  providers:[MessageService]
})
export class AttendanceReportComponent {
    dailyAttendance: any[] = [];

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private messageService: MessageService
      ) {}

      ngOnInit(): void {
        this.getdailyAttendance();
      }
  getdailyAttendance() {
    let id = localStorage.getItem('userId')
    this.http.get<any[]>(`http://localhost:8080/api/attendance/allmyattendance/`)
      .subscribe({
        next: (res:any) => {
          this.dailyAttendance = res.data;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load leave requests' });
        }
      });
  }
}
