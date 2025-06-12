import { Component, OnInit } from '@angular/core';
//import { QrCode } from '../model/Qrcode/qrgenerate';
import { QrCodeGen1 } from '../model/Qrcode/qrgen';

import { QrcodeService } from '../services/qrcode/qrcode.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    standalone: true,
    imports:[CommonModule,FormsModule,CalendarModule],
  selector: 'app-qrcodegenerate',
  templateUrl: './qrcodegenerate.component.html',
  styleUrls: ['./qrcodegenerate.component.css']
})
export class QrcodegenerateComponent implements OnInit {
  model: QrCodeGen1;
  CustList:any;
  _objPageModel: PaginationModel;
  constructor(private _objQrcodeService:QrcodeService) {
    this.model = new QrCodeGen1;
    this._objPageModel = new PaginationModel;
    this._objPageModel.PageNumber = 0;
  }

  ngOnInit(): void {
    this.GetCustList();
    this.model.QrToken = this.randomString(15);
  }

  QrCodeSubmit(){
    var displayName="QR Code";


    console.log(this.model)
    this._objQrcodeService.SaveQrTokenDetails(this.model).subscribe(
      response => {
        if(response == true) {
        alert(displayName + "  Generated Sucessfully");

         }
         else{
          alert("Error while save QR Token");
         }
      },
      error => alert('Cant Save QR Token')
    )
  }

  randomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
      for ( var i = 0; i < length; i++ ) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
    return result;
  }


  GetCustList(){
    this._objQrcodeService.GetAllShopsList().subscribe(
      response => {console.log(response)
          this.CustList=response


      },
      error => alert('InternalServer Error')
    )
  }

}
