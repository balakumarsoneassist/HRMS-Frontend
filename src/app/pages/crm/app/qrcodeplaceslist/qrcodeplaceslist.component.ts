import { Component, OnInit, Input } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { QrcodeService } from '../services/qrcode/qrcode.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Qrshops } from '../model/Qrcode/qrplaces';
import { PaginationModel } from '../model/Contact/ContactModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrcodeplacesComponent } from "../qrcodeplaces/qrcodeplaces.component";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, QrcodeplacesComponent],
  selector: 'app-qrcodeplaceslist',
  templateUrl: './qrcodeplaceslist.component.html',
  styleUrls: ['./qrcodeplaceslist.component.css']
})
export class QrcodeplaceslistComponent implements OnInit {
  model: Qrshops;
  ManualPageInput: any;
  PageNumber: number = 0;
  TotalNumberOfPages = 1;
  TotalRecordNo: Number = 0;
  IsbtnPreviousEnable: boolean = true;
  IsbtnNextEnable: boolean = true;
  StartNo!: number;
  EndNo!: number;
  _objPageModel: PaginationModel;
  shopsFilter: any;
  constructor(private QrService: QrcodeService, private router: Router) {
    this.model = new Qrshops;
    this._objPageModel = new PaginationModel;
   }

  ngOnInit(): void {
    this.QrService.ShopsRefershObservable.subscribe(response => {
      this.getShopsList();
      this.EnablePageButton();
    })
    this.getShopsList();
  }

  editQrshop(shop) {
    // this.employeeService.
    this.router.navigate(['/qrcodeplaces'], { state: { data: shop } });
  }

  getShopsList() {
    this._objPageModel.PageNumber = this.PageNumber;
    this._objPageModel.SearchText = this.shopsFilter;
    this.QrService.GetShopsList(this._objPageModel).subscribe(
      response => {
        this.model.QrshopsList = response;
        console.log(response)
        if (this.model.QrshopsList.length == 0) {
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
      error => alert('Internel Server Error')
    )
  }

  openShopModel(Id) {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.style.display = "flex";
    this.QrService.SendShopId(Id);
  }

  closeModel() {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.removeAttribute('style');
  }
  GoToNextPage() {
    if (this.PageNumber < this.TotalNumberOfPages) {
      this.PageNumber = this.PageNumber + 1;
    }
    this.getShopsList();
    this.EnablePageButton();
  }
  GoToPreviousPage() {
    if (this.PageNumber > 0) {
      this.PageNumber = this.PageNumber - 1;
    }
    else {
      this.IsbtnPreviousEnable = false;
    }
    this.getShopsList();
    this.EnablePageButton();
  }
  EnablePageButton() {
    if (this.PageNumber > 0) {
      this.IsbtnPreviousEnable = true;
    }
    else {
      this.IsbtnPreviousEnable = false;
    }
    if(this.TotalNumberOfPages === 1){
      this.IsbtnNextEnable = false;
    }
    else if (this.PageNumber + 1 < this.TotalNumberOfPages || this.PageNumber === 0) {

      this.IsbtnNextEnable = true;
    }
    else {
      this.IsbtnNextEnable = false;
    }
  }
  PageFooterCalculation() {

    this.StartNo = (this.PageNumber * 10) + 1;
    this.EndNo = (this.PageNumber * 10) + 10;
    this.TotalNumberOfPages = Math.floor(this.model.QrshopsList[0].TotalRows / 10);
    if ((this.model.QrshopsList[0].TotalRows % 10) > 0) {
      this.TotalNumberOfPages = this.TotalNumberOfPages + 1;
    }
  }
  ChangePageNumber(pageIndex) {
    this._objPageModel.PageNumber = pageIndex;
    this.getShopsList();
  }

}
