import { Component, OnInit } from '@angular/core';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { RevenueproductMasterComponent } from "../revenueproduct-master/revenueproduct-master.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    standalone:true,
  selector: 'app-revenueproduct-list',
  templateUrl: './revenueproduct-list.component.html',
  styleUrls: ['./revenueproduct-list.component.css'],
  imports: [RevenueproductMasterComponent,FormsModule,CommonModule]
})
export class RevenueproductListComponent implements OnInit {
  ProductList:any;
  constructor(private objRevenueSer:RevenueProductService) { }

  ngOnInit(): void {
    this.GetProductList();
  }

  GetProductList(){

    this.objRevenueSer.GetRPlist().subscribe(
      response => {
        this.ProductList = response;

      })
  }
  EditProduct(id:any,cat:any,pro:any,per:any,rpn:any) {
    this.objRevenueSer.statusOpeningAcco();
    var allparam = id+'**'+cat+'**'+pro+'**'+per+'**'+rpn;
    this.objRevenueSer.SendProductId(allparam);

  }


}
