import { FloatLabelModule } from 'primeng/floatlabel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report/reportservice';
import { MagarepModel } from '../../model/report/dailyreport';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SearchpipePipe } from '../../pipe/searchpipe.pipe';

@Component({
  selector: 'app-ncfallstatusreport',
  standalone: true,
  template: `
    <p-toast></p-toast>
    <div class="container">
      <div class="flex flex-column gap-3 p-3">
        <div class="bg-color-ContHead flex justify-content-between align-items-center py-2 px-3 font-w-600 border-b rounded">
          <div class="text-xl">Contact Status Report - {{ StatusType }}</div>
        </div>

        <div class="bg-color-ContBody1 p-3 rounded">
          <div class="flex align-items-center gap-3 mb-3">
            <p-floatLabel class="w-full sm:w-20rem">
              <input
                pInputText
                id="search"
                type="text"
                [(ngModel)]="searchStr"
                placeholder=""
                class="w-full"
              />
              <label for="search">Search</label>
            </p-floatLabel>
          </div>

          <p-table
            [value]="StatusList | searchpipe : searchStr"
            responsiveLayout="scroll"
            class="font-w-600"
          >
            <ng-template pTemplate="header">
              <tr>
                <th>Name</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-row>
              <tr>
                <td>{{ row.name }}</td>
                <td>{{ row.total }}</td>
                <td>
                  <button
                    pButton
                    label="Details"
                    size="small"
                    (click)="callStatus(row.contactfollowedby, row.name)"
                  ></button>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ncfallstatusreport.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FloatLabelModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    SearchpipePipe
  ]
})
export class NcfallstatusreportComponent implements OnInit {
  StatusList: any;
  StatusType: string = '';
  searchStr: string = '';
  scode!: number;

  resInpModel: MagarepModel = {} as MagarepModel;

  constructor(
    private reportService: ReportService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.StatusType = localStorage.getItem('statustype') || '';
    this.scode = Number(localStorage.getItem('statuscode'));
    this.GetLFAllList(this.scode);
  }

  GetLFAllList(code: number) {
    this.resInpModel.statuscode = code;
    this.resInpModel.Empid = 0;

    this.reportService.getCFAllStatusReport(this.resInpModel).subscribe({
      next: (response) => {
        this.StatusList = response;
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

  callStatus(Id: string, Ename: string) {
    localStorage.setItem('empid', Id);
    localStorage.setItem('followerName', Ename);

    if (this.scode < 11) {
      this.router.navigate(['home/ncfempreport']);
    } else {
      this.router.navigate(['home/nlfempreport']);
    }
  }
}
