import { Component, OnInit } from '@angular/core';
import { QrcodeService } from '../services/qrcode/qrcode.service';

import { Qrtoken } from '../model/Qrcode/Qrtoken';
import { PaginationModel } from '../model/Contact/ContactModel';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports:[CommonModule,FormsModule],
  selector: 'app-qrcodecustomers',
  templateUrl: './qrcodecustomers.component.html',
  styleUrls: ['./qrcodecustomers.component.css']
})
export class QrcodecustomersComponent implements OnInit {
  model: Qrtoken;
  ManualPageInput: any;
  PageNumber: number = 0;
  TotalNumberOfPages = 1;
  TotalRecordNo: Number = 0;
  IsbtnPreviousEnable: boolean = true;
  IsbtnNextEnable: boolean = true;
  StartNo!: number;
  EndNo!: number;
  _objPageModel: PaginationModel;
  qrtokenFilter: any;
  constructor(private QrService: QrcodeService, private router: Router) {
    this.model = new Qrtoken;
    this._objPageModel = new PaginationModel;
   }

  ngOnInit(): void {
    this.getQrtokenList();
  }

  getQrtokenList() {
    this._objPageModel.PageNumber = this.PageNumber;
    this._objPageModel.SearchText = this.qrtokenFilter;
    this.QrService.GetTokenList(this._objPageModel).subscribe(
      response => {
        this.model.QrTokenList = response;
        console.log(response)
        if (this.model.QrTokenList.length == 0) {
          this.PageNumber = 0;
          this.TotalRecordNo = 0;
          this.TotalNumberOfPages = 0;
          this.StartNo = 0;
          this.EndNo = 0;
          return;
        }
        this.TotalRecordNo = this.model.QrTokenList[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
        this.PageFooterCalculation();
        this.EnablePageButton();
      },
      error => alert('Internel Server Error')
    )
  }


  GoToNextPage() {
    if (this.PageNumber < this.TotalNumberOfPages) {
      this.PageNumber = this.PageNumber + 1;
    }
    this.getQrtokenList();
    this.EnablePageButton();
  }
  GoToPreviousPage() {
    if (this.PageNumber > 0) {
      this.PageNumber = this.PageNumber - 1;
    }
    else {
      this.IsbtnPreviousEnable = false;
    }
    this.getQrtokenList();
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
    this.TotalNumberOfPages = Math.floor(this.model.QrTokenList[0].TotalRows / 10);
    if ((this.model.QrTokenList[0].TotalRows % 10) > 0) {
      this.TotalNumberOfPages = this.TotalNumberOfPages + 1;
    }
  }
  ChangePageNumber(pageIndex) {
    this._objPageModel.PageNumber = pageIndex;
    this.getQrtokenList();
  }

}
