import { Component, OnInit } from '@angular/core';
import { Qrshops } from '../model/Qrcode/qrplaces';
import { QrcodeService } from '../services/qrcode/qrcode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports:[CommonModule,FormsModule],
  selector: 'app-qrcodeplaces',
  templateUrl: './qrcodeplaces.component.html',
  styleUrls: ['./qrcodeplaces.component.css']
})
export class QrcodeplacesComponent implements OnInit {
  model: Qrshops;
  EmpList:any;
  stateData:any;
  constructor(private _objQrcodeService:QrcodeService) {
    this.model = new Qrshops();
   }

  ngOnInit(): void {
   this.GetEmpNameList();
   this._objQrcodeService.ShopSubjectObservable.subscribe(response=>{
    this.GetShopById(response);
  })
  this.stateData = history.state.data;
  if(this.stateData) {
    this.model = this.stateData;
  }
  }
  GetEmpNameList(){
    this._objQrcodeService.GetEmployeeNameList().subscribe(
      response => {console.log(response)
          this.EmpList=response


      },
      error => alert('InternalServer Error')
    )
  }
  QrShopsSubmit(){
    var displayName=this.model.Name;
    console.log(this.model);
    this._objQrcodeService.SaveQrplaceDetails(this.model).subscribe(
      response => {
        if(response == true) {
        alert(displayName + " Saved Sucessfully");
        this._objQrcodeService.ShopsListRefresh();
        this.closeModel();
         }
         else{
          alert("Error while save QRPlaces");
         }
      },
      error => alert('Cant Save')
    )
  }

  GetShopById(ShopId)
  {
    this._objQrcodeService.GetShopById(ShopId).subscribe(
      response => {
       this.model=response[0];
      },
      error => alert('Cant Save')
    )
  }

  closeModel() {
  //  let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
  //  cibilReportModel.removeAttribute('style');
  }

}
