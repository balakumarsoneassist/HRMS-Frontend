// PrimeNG 19 + Angular 19 Reactive Form + Dialog + Table + Toast version

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { AchieveParamModel } from '../model/revenue/revenuemodel';
import { LoaderService } from '../services/loader/loader.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  standalone: true,
  selector: 'app-revenuetarget-details',
  templateUrl: './revenuetarget-details.component.html',
  styleUrls: ['./revenuetarget-details.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule,
    FormsModule
  ]
})
export class RevenuetargetDetailsComponent implements OnInit {
  empid!: number;
  ename!: string;
  finyear!: string;
  pmodel: AchieveParamModel = new AchieveParamModel();
  AchieveList: any[] = [];
  searchStr = '';
  loadSpin = 0;
  displayDialog = false;

  constructor(
    private objRevservice: RevenueProductService,
    public loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.objRevservice.empidSendObservable.subscribe({
      next: (response) => {
        const tmpid = response.split('**');
        this.empid = +tmpid[0];
        this.ename = tmpid[1];
        this.finyear = tmpid[2];
        this.loadSpin = 4;
        this.displayDialog = true;
        this.Getdata();
      }
    });
  }

  Getdata() {
    this.pmodel.EmpId = this.empid;
    this.pmodel.fyear = this.finyear;
    this.pmodel.type = localStorage.getItem('usertype') || '';

    this.objRevservice.GetTargetAchievementByemp(this.pmodel).subscribe({
      next: (response) => {
        this.AchieveList = response;
        this.loadSpin = 0;
        this.messageService.add({ severity: 'success', summary: 'Loaded', detail: 'Achievement details loaded.' });
      },
      error: () => {
        this.loadSpin = 0;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server error while loading details.' });
      }
    });
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
