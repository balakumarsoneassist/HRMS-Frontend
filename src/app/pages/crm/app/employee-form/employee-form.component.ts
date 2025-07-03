import { Component, Input, input, OnInit } from '@angular/core';
import { Employee } from '../model/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TagInputModule } from 'ngx-chips';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    CalendarModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
    TagInputModule,
    FloatLabelModule,
    ReactiveFormsModule    // optionally ReactiveFormsModule if you use reactive
  ],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  tagInputList: any[] = [];
  stateData: any;
  @Input() model: Employee = new Employee();


  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.employeeForm = this.fb.group({
      Name: ['', Validators.required],
      Qualification: [''],
      DateOfBirth: [null],
      JoinDate: [null],
      Dept: [''],
      Designation: [''],
      PresentAddress: [''],
      PermanentAddress: [''],
      MobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      EmailId: ['', [Validators.email]],
      ContactPerson: [''],
      ContactNumber: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      Branch: [[]],
      IsActive: [false],
      IsAdminRights: [false],
      IsContactRights: [false],
      IsLeadRights: [false],
      IsCibilRights: [false],
      IsIciciRights: [false],
      IsSplRights: [false],
      IsReassignRights: [false],
    });
  }

  ngOnInit(): void {
    this.stateData = history.state.data;
    console.log(this.stateData);

    if (this.stateData) {
      this.employeeForm.patchValue(this.stateData);
    }
    this.GetBranchList();
    this.employeeService.EmployeeSubjectObservable.subscribe((id) => {
        console.log(id);

      this.GetEmployeeById(id);
    });
  }

  employeeSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload: Employee = this.employeeForm.value;

    this.employeeService.SaveEmployeeDetails(payload).subscribe({
      next: (response) => {
        if (response === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: `${payload.Name} saved successfully`,
          });
          this.employeeService.EmployeeListRefresh();
          this.closeModel();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Duplicate',
            detail: 'Email ID already exists',
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot save',
        });
      },
    });
  }

  GetEmployeeById(EmployeeId: any) {
    this.employeeService.GetEmployeeById(EmployeeId).subscribe({
      next: (response) => {
        if (response && response[0]) {
          this.employeeForm.patchValue(response[0]);
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot fetch employee',
        });
      },
    });
  }

  closeModel() {
    const modal = document.querySelector('.cibilReportModel') as HTMLElement;
    modal?.removeAttribute('style');
  }

  GetBranchList() {
    this.employeeService.GetBranchList().subscribe({
      next: (res) => (this.tagInputList = res),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot load branch list',
        }),
    });
  }
}
