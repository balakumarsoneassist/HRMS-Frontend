// PrimeNG 19 + Angular 19 Reactive Form Version with p-dropdown, p-toast, and p-table

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AchieveParamModel } from '../model/revenue/revenuemodel';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { LoaderService } from '../services/loader/loader.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RevenuetargetDetailsComponent } from '../revenuetarget-details/revenuetarget-details.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  standalone: true,
  selector: 'app-revenuetarget-achivement',
  templateUrl: './revenuetarget-achivement.component.html',
  styleUrls: ['./revenuetarget-achivement.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    ToastModule,
    RevenuetargetDetailsComponent,
    ProgressSpinnerModule
  ]
})
export class RevenuetargetAchivementComponent implements OnInit {
  form: FormGroup;
  AchieveList: any[] = [];
  rmon = '';
  rfyr = '';
  loadSpin = 0;
  monthOptions = [
    { label: 'Jan', value: '01' }, { label: 'Feb', value: '02' }, { label: 'Mar', value: '03' },
    { label: 'Apr', value: '04' }, { label: 'May', value: '05' }, { label: 'Jun', value: '06' },
    { label: 'Jul', value: '07' }, { label: 'Aug', value: '08' }, { label: 'Sep', value: '09' },
    { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' }
  ];
  yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = 2020 + i;
    return { label: year.toString(), value: year.toString() };
  });

  constructor(
    private fb: FormBuilder,
    private objRevenueSer: RevenueProductService,
    public loaderService: LoaderService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      month: ['01'],
      year: ['2020'],
      fyear: ['2019-2020']
    });
  }

  ngOnInit(): void {
    this.setFinYear('01', '2020');
  }

  changeMonth(event: any) {
    const year = this.form.value.year.label;
    const month = event.value.value || event;
    this.setFinYear(month, year);
  }

  changeYear(event: any) {
    const month = this.form.value.month.label;
    const year = event.value.value || event;
    this.setFinYear(month, year);
  }

  setFinYear(mon: any, yr: any) {
    const m = Number(mon);
    const y = Number(yr);
    let f1 = '', f2 = '';
    if (m >= 4) {
      f1 = y.toString();
      f2 = (y + 1).toString();
    } else {
      f2 = y.toString();
      f1 = (y - 1).toString();
    }
    const fyr = `${f1}-${f2}`;
    this.form.patchValue({ fyear: fyr });
  }

  Getdata() {
    const val = this.form.value;
    const model: any = {
      month: val.month?.value || val.month,
      year: val.year?.value || val.year,
      fyear: val.fyear,
      type: localStorage.getItem('usertype') || ''
    };

    this.rmon = `${model.month} - ${model.year}`;
    this.rfyr = model.fyear;
    this.loadSpin = 1;

    this.objRevenueSer.GetTargetAchievement(model).subscribe({
      next: (response) => {
        this.AchieveList = response;
        this.loadSpin = 0;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Achievement data loaded.' });
      },
      error: () => {
        this.loadSpin = 0;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch achievement data.' });
      }
    });
  }

  Getdetails(eid: number, name: string) {
    if (!eid) eid = 0;
    const tmp = `${eid}**${name}**${this.rfyr}`;
    const customerModel1 = document.querySelector('.callHistoryModel1') as HTMLElement;
    if (customerModel1) {
      customerModel1.style.display = 'flex';
    }
    this.objRevenueSer.statusOpeningAcco1();
    this.objRevenueSer.SendEmpId(tmp);
  }
}
