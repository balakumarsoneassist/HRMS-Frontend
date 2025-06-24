// Angular 19 + PrimeNG 19 Reactive Form Conversion with Responsive Styling

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../services/employee/employee.service';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { RevenuetargetListComponent } from '../revenuetarget-list/revenuetarget-list.component';
import { TargetEntryModel } from '../model/revenue/revenuemodel';

@Component({
  standalone: true,
  selector: 'app-revenuetarget-entry',
  templateUrl: './revenuetarget-entry.component.html',
  styleUrls: ['./revenuetarget-entry.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RevenuetargetListComponent
  ],
  providers: [MessageService]
})
export class RevenuetargetEntryComponent implements OnInit {
  form: FormGroup;
  EmpList: any[] = [];
  model: TargetEntryModel = new TargetEntryModel();

  monthOptions = [
    { label: 'Jan', value: '01' },
    { label: 'Feb', value: '02' },
    { label: 'Mar', value: '03' },
    { label: 'Apr', value: '04' },
    { label: 'May', value: '05' },
    { label: 'Jun', value: '06' },
    { label: 'Jul', value: '07' },
    { label: 'Aug', value: '08' },
    { label: 'Sep', value: '09' },
    { label: 'Oct', value: '10' },
    { label: 'Nov', value: '11' },
    { label: 'Dec', value: '12' }
  ];

  yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = 2020 + i;
    return { label: year.toString(), value: year.toString() };
  });

  constructor(
    private fb: FormBuilder,
    private _objEmpService: EmployeeService,
    private objRevenueSer: RevenueProductService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      id: [0],
      empid: [''],
      ename: ['', Validators.required],
      revtarget: ['', Validators.required],
      fltarget: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.GetEmpNameList();
    this.objRevenueSer.TargetidSendObservable.subscribe(response => {
      this.FillTargetmaster(response);
    });
  }

  GetEmpNameList() {
    this._objEmpService.GetActiveEmpList().subscribe(
      response => this.EmpList = response,
      error => alert('InternalServer Error')
    );
  }

  SaveTarget() {
    if (this.form.valid) {
      let val = this.form.value;
      val.month = val.month.value
      val.year = val.year.value
      val.eidMY = val.empid + val.month + val.year;

      this.objRevenueSer.SaveRevenueTarget(val).subscribe(
        response => {
          if (response === true) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully' });
            setTimeout(() => window.location.reload(), 1000);
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Exists', detail: 'Record already exists.' });
          }
        },
        error => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Save failed' })
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Please fill all required fields.' });
    }
  }

  changeEname(event: any) {
    const emp = this.EmpList.find(e => e.EmpName === event.value);
    if (emp) {
      this.form.patchValue({ empid: emp.Id });
    }
  }

  FillTargetmaster(res: any) {
    const tmp = res.split('**');
    this.form.patchValue({
      id: tmp[0],
      ename: tmp[1],
      revtarget: tmp[2],
      fltarget: tmp[3],
      empid: tmp[4].substring(0, tmp[4].length - 6),
      month: tmp[4].substring(tmp[4].length - 6, tmp[4].length - 4),
      year: tmp[4].substring(tmp[4].length - 4)
    });
  }
}
