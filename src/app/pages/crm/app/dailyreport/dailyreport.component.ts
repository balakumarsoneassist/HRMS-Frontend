import { Component, OnInit } from '@angular/core';
import { DailyReportModel, PaginationModel1 } from '../model/report/dailyreport';
import { ReportService } from '../services/report/reportservice';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-dailyreport',
  templateUrl: './dailyreport.component.html',
  styleUrls: ['./dailyreport.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule
  ]
})
export class DailyreporComponent implements OnInit {
  filterForm: FormGroup;
  model: DailyReportModel[] = [];
  EmpList: any[] = [];
  loading = false;

  // pagination
  paginationModel: PaginationModel1 = {} as PaginationModel1;
  ManualPageInput: any;
  PageNumber: number = 0;
  TotalNumberOfPages = 1;
  TotalRecordNo: number = 0;
  IsbtnPreviousEnable: boolean = false;
  IsbtnNextEnable: boolean = false;
  StartNo = 0;
  EndNo = 0;

  constructor(
    private repService: ReportService,
    private empService: EmployeeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.filterForm = this.fb.group({
      Assignee: [''],
      FromDate: [''],
      ToDate: [''],
      SearchText: ['']
    });
  }

  ngOnInit(): void {
    this.getEmpNameList();
  }

  getEmpNameList() {
    this.empService.GetAssigneeList().subscribe({
      next: (res) => (this.EmpList = res),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load assignees'
        })
    });
  }

  getDailyReport() {
    this.PageNumber = 0;
    this.paginationModel.PageNumber = this.PageNumber;
    this.paginationModel.AssigneeName = this.filterForm.value.Assignee;
    this.paginationModel.FromDate = this.filterForm.value.FromDate;
    this.paginationModel.ToDate = this.filterForm.value.ToDate;
    this.paginationModel.SearchText = this.filterForm.value.SearchText;

    this.loading = true;
    this.repService.getDailyUserReport(this.paginationModel).subscribe({
      next: (res) => {
        this.model = res;
        this.loading = false;
        if (res.length === 0) {
          this.TotalRecordNo = 0;
          this.PageNumber = 0;
          this.TotalNumberOfPages = 0;
          this.StartNo = 0;
          this.EndNo = 0;
          return;
        }
        this.TotalRecordNo = res[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
        this.PageFooterCalculation();
        this.EnablePageButton();
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load daily report'
        });
      }
    });
  }

  // pagination controls
  GoToNextPage() {
    if (this.PageNumber < this.TotalNumberOfPages) {
      this.PageNumber++;
      this.getDailyReport();
    }
  }
  GoToPreviousPage() {
    if (this.PageNumber > 0) {
      this.PageNumber--;
      this.getDailyReport();
    }
  }
  EnablePageButton() {
    this.IsbtnPreviousEnable = this.PageNumber > 0;
    this.IsbtnNextEnable = this.PageNumber + 1 < this.TotalNumberOfPages || this.PageNumber === 0;
  }
  PageFooterCalculation() {
    this.StartNo = this.PageNumber * 10 + 1;
    this.EndNo = this.PageNumber * 10 + 10;
    let models: any = this.model[0];
    this.TotalNumberOfPages = Math.floor(models.TotalRows / 10);
    if (models.TotalRows % 10 > 0) {
      this.TotalNumberOfPages++;
    }
  }
}
