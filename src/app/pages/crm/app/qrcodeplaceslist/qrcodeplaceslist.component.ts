import { Component, OnInit } from '@angular/core';
import { Qrshops } from '../model/Qrcode/qrplaces';
import { QrcodeService } from '../services/qrcode/qrcode.service';
import { Router } from '@angular/router';
import { PaginationModel } from '../model/Contact/ContactModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrcodeplacesComponent } from "../qrcodeplaces/qrcodeplaces.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-qrcodeplaceslist',
  standalone: true,
  templateUrl: './qrcodeplaceslist.component.html',
  styleUrls: ['./qrcodeplaceslist.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    QrcodeplacesComponent
  ]
})
export class QrcodeplaceslistComponent implements OnInit {
  model: Qrshops = new Qrshops();
  ManualPageInput: any;
  PageNumber: number = 0;
  TotalNumberOfPages = 1;
  TotalRecordNo: number = 0;
  IsbtnPreviousEnable: boolean = true;
  IsbtnNextEnable: boolean = true;
  StartNo!: number;
  EndNo!: number;
  shopsFilter: string = '';

  showQrDialog = false;
  currentShopId: string = '';

  _objPageModel: PaginationModel = new PaginationModel();

  constructor(
    private qrService: QrcodeService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.qrService.ShopsRefershObservable.subscribe(() => {
      this.getShopsList();
      this.EnablePageButton();
    });
    this.getShopsList();
  }

  getShopsList() {
    this._objPageModel.PageNumber = this.PageNumber;
    this._objPageModel.SearchText = this.shopsFilter;
    this.qrService.GetShopsList(this._objPageModel).subscribe({
      next: response => {
        this.model.QrshopsList = response;
        if (this.model.QrshopsList.length === 0) {
          this.PageNumber = 0;
          this.TotalRecordNo = 0;
          this.TotalNumberOfPages = 0;
          this.StartNo = 0;
          this.EndNo = 0;
          return;
        }
        this.TotalRecordNo = this.model.QrshopsList[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
        this.PageFooterCalculation();
        this.EnablePageButton();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
      }
    });
  }

  openShopDialog(shopId: string) {
    this.showQrDialog = true;
    this.qrService.SendShopId(shopId);
  }

  closeShopDialog() {
    this.showQrDialog = false;
  }

  GoToNextPage() {
    if (this.PageNumber < this.TotalNumberOfPages) {
      this.PageNumber++;
    }
    this.getShopsList();
    this.EnablePageButton();
  }

  GoToPreviousPage() {
    if (this.PageNumber > 0) {
      this.PageNumber--;
    }
    this.getShopsList();
    this.EnablePageButton();
  }

  EnablePageButton() {
    this.IsbtnPreviousEnable = this.PageNumber > 0;
    if (this.TotalNumberOfPages === 1) {
      this.IsbtnNextEnable = false;
    } else if (this.PageNumber + 1 < this.TotalNumberOfPages || this.PageNumber === 0) {
      this.IsbtnNextEnable = true;
    } else {
      this.IsbtnNextEnable = false;
    }
  }

  PageFooterCalculation() {
    this.StartNo = this.PageNumber * 10 + 1;
    this.EndNo = this.PageNumber * 10 + 10;
    this.TotalNumberOfPages = Math.floor(this.model.QrshopsList[0].TotalRows / 10);
    if (this.model.QrshopsList[0].TotalRows % 10 > 0) {
      this.TotalNumberOfPages++;
    }
  }
}
