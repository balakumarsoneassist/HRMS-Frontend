import { Component, OnInit } from '@angular/core';
import { RevenueProductModel } from '../model/revenue/revenuemodel';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
      imports: [CommonModule,FormsModule,ReactiveFormsModule],
  selector: 'app-revenueproduct-master',
  templateUrl: './revenueproduct-master.component.html',
  styleUrls: ['./revenueproduct-master.component.css']
})
export class RevenueproductMasterComponent implements OnInit {
  model:RevenueProductModel = new RevenueProductModel();
  constructor(private objRevenueSer:RevenueProductService) { }

  ngOnInit(): void {
    this.model.id = 0;
    this.objRevenueSer.ProductidSendObservable.subscribe(response=>{
      // console.log(response+'-------QWE')

      // this.model.id = response;// ie from id, here response is id
       //console.log(this.model);
       this.FillRPmaster(response);

     })
  }

  Generatepname(){
    var pname = '';
    pname = this.model.product + this.model.category;
    //alert(pname);
    this.model.rpname = pname;
    if(this.model.product == 'HL') {
      this.model.pname = 'Home Loan';
    }
    else if(this.model.product == 'PL') {
      this.model.pname = 'Personal Loan';
    }
    else if(this.model.product == 'BL') {
      this.model.pname = 'Business Loan';
    }
    else if(this.model.product == 'LAP') {
      this.model.pname = 'Loan Against Property';
    }
  }
  SaveProduct() {
    this.Generatepname();
    this.objRevenueSer.SaveRevenueProduct(this.model).subscribe(
      response => {
        if(response == true) {

         alert(" Saved Sucessfully");
         window.location.reload();

         }
         else {
          alert('Record already available.....!');
         }

      },
      error => alert('Cant Save master -- May record already available..')
    )
    }

    FillRPmaster(res:any) {
      var tmp = res.split('**');
      this.model.id = tmp[0];
      this.model.category = tmp[1];
      this.model.product = tmp[2];
      this.model.percentage = tmp[3];
      this.model.rpname = tmp[4];
      //console.log(this.model)
    }
  }


