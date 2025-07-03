import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../model/employee/employee';
import { PaginationModel } from '../model/Contact/ContactModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    EmployeeFormComponent,
    FloatLabelModule
  ],
})
export class EmployeeListComponent implements OnInit {
  form: FormGroup;
  employees: Employee[] = [];
  selectedEmployee!: Employee | null;
  displayModal = false;
  loading = false;
  totalRecords = 0;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.getEmployeeList();
    this.employeeService.EmployeeRefershObservable.subscribe(() => {
      this.getEmployeeList();
    });
  }

  getEmployeeList() {
    this.loading = true;
    const model = new PaginationModel();
    model.PageNumber = 0;
    model.SearchText = this.form.get('search')?.value;

    this.employeeService.GetEmployeeList(model).subscribe({
      next: (response) => {
        this.employees = response;
        if (this.employees.length > 0) {
          this.totalRecords = response[0].TotalRows;
        } else {
          this.totalRecords = 0;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employees',
        });
      },
    });
  }

  openEmployeeModal(employee?: any) {
    console.log(employee);

    if (employee) {
      this.selectedEmployee = employee;
    } else {
      this.selectedEmployee = null;
    }
    this.employeeService.SendEmployeeId(employee.Id);
    this.displayModal = true;
  }

  closeEmployeeModal() {
    this.displayModal = false;
  }
}
