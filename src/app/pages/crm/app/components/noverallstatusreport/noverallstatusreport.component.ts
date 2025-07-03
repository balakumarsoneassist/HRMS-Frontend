import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report/reportservice';
import { SearchpipePipe } from '../../pipe/searchpipe.pipe';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-noverallstatusreport',
  standalone: true,
  templateUrl:'./noverallstatusreport.component.html',
  styleUrls: ['./noverallstatusreport.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ToastModule,
    SearchpipePipe
  ]
})
export class NoverallstatusreportComponent implements OnInit {
  StatusList: any;
  searchStr: string = '';

  constructor(
    private reportService: ReportService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('statustype', '');
    localStorage.setItem('statuscode', '');
    localStorage.setItem('followerName', '');
    this.GetStatusList();
  }

  GetStatusList() {
    this.reportService.getOverAllStatusReport().subscribe({
      next: (response) => {
        this.StatusList = response;
        console.log(response);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Server Error'
        });
      }
    });
  }

  callStatus(scode: string, stype: string) {
    this.reportService.statusOpeningAcco();
    this.reportService.SendStatusCode(scode);

    localStorage.setItem('statuscode', scode);
    localStorage.setItem('statustype', stype);

    if (+scode < 11 || +scode == 22) {
      this.router.navigate(['home/ncfallreport']);
    } else {
      this.router.navigate(['home/nlfallreport']);
    }
  }
}
