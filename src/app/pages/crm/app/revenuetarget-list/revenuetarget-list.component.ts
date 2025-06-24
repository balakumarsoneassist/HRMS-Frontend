// PrimeNG 19 + Angular 19 Reactive Version of RevenueTarget List Component with Toast

import { Component, OnInit } from '@angular/core';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { TargetParamModel } from '../model/revenue/revenuemodel';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-revenuetarget-list',
  templateUrl: './revenuetarget-list.component.html',
  styleUrls: ['./revenuetarget-list.component.css'],
  providers: [MessageService],
  imports: [CommonModule, ReactiveFormsModule, TableModule, DropdownModule, ButtonModule, ToastModule]
})
export class RevenuetargetListComponent implements OnInit {
  targetForm: FormGroup;
  TargetList: any[] = [];
  monthOptions = [
    { label: 'Jan', value: '01' }, { label: 'Feb', value: '02' },
    { label: 'Mar', value: '03' }, { label: 'Apr', value: '04' },
    { label: 'May', value: '05' }, { label: 'Jun', value: '06' },
    { label: 'Jul', value: '07' }, { label: 'Aug', value: '08' },
    { label: 'Sep', value: '09' }, { label: 'Oct', value: '10' },
    { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' }
  ];
  yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = 2020 + i;
    return { label: year.toString(), value: year.toString() };
  });

  constructor(
    private fb: FormBuilder,
    private objRevenueSer: RevenueProductService,
    private messageService: MessageService
  ) {
    this.targetForm = this.fb.group({
      month: [''],
      year: ['']
    });
  }

  ngOnInit(): void {}

  Getdata() {
    const formVal = this.targetForm.value;
    const pmodel: TargetParamModel = {
      month: formVal.month?.value || formVal.month,
      year: formVal.year?.value || formVal.year
    };

    this.objRevenueSer.GetTargetlist(pmodel).subscribe({
      next: (response) => {
        this.TargetList = response;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Target list fetched successfully'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch target list'
        });
      }
    });
  }

  EditTarget(id: any, ename: any, rt: any, flt: any, eidmy: any) {
    this.objRevenueSer.statusOpeningAcco();
    const allparam = `${id}**${ename}**${rt}**${flt}**${eidmy}`;
    this.objRevenueSer.SendTargetId(allparam);
  }
}
