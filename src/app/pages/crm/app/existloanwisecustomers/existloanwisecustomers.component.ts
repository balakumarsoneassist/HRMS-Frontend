import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { PWCModel } from '../model/report/dailyreport';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-existloanwisecustomers',
  templateUrl: './existloanwisecustomers.component.html',
  styleUrls: ['./existloanwisecustomers.component.css'],
  imports: [
    CommonModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class ExistloanwisecustomersComponent implements OnInit {
  pwcList: any[] = [];
  prodModel: PWCModel = new PWCModel();

  constructor(
    private service: CatReportService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.service.prodSendObservable.subscribe((response) => {
      this.getPWcust(response);
    });
  }

  getPWcust(pcode: string) {
    this.prodModel.product = pcode;
    this.service.getLoanwiseDetailReport(this.prodModel).subscribe({
      next: (res) => {
        this.pwcList = res;
        console.log(res);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load product-wise customer details'
        });
      }
    });
  }
}
