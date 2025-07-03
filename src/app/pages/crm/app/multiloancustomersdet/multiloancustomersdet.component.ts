import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { MLModel } from '../model/report/dailyreport';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-multiloancustomersdet',
  templateUrl: './multiloancustomersdet.component.html',
  styleUrls: ['./multiloancustomersdet.component.css'],
  imports: [CommonModule, TableModule, ToastModule],
  providers: [MessageService]
})
export class MultiloancustomersdetComponent implements OnInit {
  pwcList: any[] = [];
  spname: string[] = [];
  loanModel: MLModel = new MLModel();

  constructor(
    private service: CatReportService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.service.MLCSendObservable.subscribe((response) => {
      this.getMLCcust(response);
    });
  }

  getMLCcust(pcode: string) {
    this.spname = pcode.split('--');
    this.loanModel.name = this.spname[0];
    this.loanModel.mobile = this.spname[1];

    this.service.getMLDetailReport(this.loanModel).subscribe({
      next: (res) => {
        this.pwcList = res;
        console.log(res);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load multi-loan customer details'
        });
      }
    });
  }
}
