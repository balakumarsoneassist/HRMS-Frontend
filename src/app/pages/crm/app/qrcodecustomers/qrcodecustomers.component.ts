import { Component, OnInit } from '@angular/core';
import { QrcodeService } from '../services/qrcode/qrcode.service';
import { Qrtoken } from '../model/Qrcode/Qrtoken';
import { PaginationModel } from '../model/Contact/ContactModel';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-qrcodecustomers',
  standalone: true,
  templateUrl: './qrcodecustomers.component.html',
  styleUrls: ['./qrcodecustomers.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToastModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule
  ]
})
export class QrcodecustomersComponent implements OnInit {
  model: Qrtoken = new Qrtoken();
  _objPageModel: PaginationModel = new PaginationModel();

  searchFilter: string = '';
  totalRecords = 0;
  rows = 10;
  first = 0;

  constructor(
    private qrService: QrcodeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadTokenList();
  }

//   loadTokenList() {
//     this._objPageModel.PageNumber = this.first / this.rows; // zero-based
//     this._objPageModel.SearchText = this.searchFilter;

//     this.qrService.GetTokenList(this._objPageModel).subscribe({
//       next: (response) => {
//         this.model.QrTokenList = response;
//         if (response.length) {
//           console.log('TotalRows:', response[0].TotalRows);
//           this.totalRecords = response[0].TotalRows;  // 24 for example
//         } else {
//           this.totalRecords = 0;
//         }
//       },
//       error: () => {
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Error',
//           detail: 'Internal Server Error'
//         });
//       }
//     });
//   }
loading = false;

loadTokenList(event?: any) {
  this.loading = true;

  if (event) {
    this.first = event.first;
    this.rows = event.rows;
    this.searchFilter = event.globalFilter || this.searchFilter;
  }

  this._objPageModel.PageNumber = (this.first / this.rows); // zero-based
  this._objPageModel.SearchText = this.searchFilter;

  this.qrService.GetTokenList(this._objPageModel).subscribe({
    next: (response) => {
      this.model.QrTokenList = response;
      this.totalRecords = response.length ? response[0].TotalRows : 0;
      this.loading = false;
    },
    error: () => {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Internal Server Error'
      });
    }
  });
}

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    // recalculate page number
    this._objPageModel.PageNumber = this.first / this.rows; // zero-based
    this.loadTokenList();
  }
}
