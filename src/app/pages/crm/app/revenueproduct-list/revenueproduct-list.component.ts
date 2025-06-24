import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevenueProductModel } from '../model/revenue/revenuemodel';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-revenueproduct-list',
  templateUrl: './revenueproduct-list.component.html',
  styleUrls: ['./revenueproduct-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class RevenueproductListComponent implements OnInit {
  model: RevenueProductModel = new RevenueProductModel();
  ProductList: any[] = [];

  productOptions = [
    { label: 'Personal Loan', value: 'PL' },
    { label: 'Business Loan', value: 'BL' },
    { label: 'Home Loan', value: 'HL' },
    { label: 'LAP', value: 'LAP' }
  ];

  categoryOptions = [
    { label: 'Self / Website', value: 'Self' },
    { label: 'Connector / QR', value: 'Connector' }
  ];

  constructor(
    private objRevenueSer: RevenueProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.objRevenueSer.ProductidSendObservable.subscribe(response => {
      this.fillRPmaster(response);
    });
  }

  generatepname() {
    this.model.rpname = this.model.product + this.model.category;
    switch (this.model.product) {
      case 'HL':
        this.model.pname = 'Home Loan';
        break;
      case 'PL':
        this.model.pname = 'Personal Loan';
        break;
      case 'BL':
        this.model.pname = 'Business Loan';
        break;
      case 'LAP':
        this.model.pname = 'Loan Against Property';
        break;
    }
  }

  saveProduct() {
    this.generatepname();
    this.objRevenueSer.SaveRevenueProduct(this.model).subscribe(
      response => {
        if (response === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved Successfully'
          });
          this.model = new RevenueProductModel();
          this.getProductList();
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Record already exists.'
          });
        }
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot save master. Record might already exist.'
        });
      }
    );
  }

  fillRPmaster(res: any) {
    const tmp = res.split('**');
    this.model.id = tmp[0];
    this.model.category = tmp[1];
    this.model.product = tmp[2];
    this.model.percentage = tmp[3];
    this.model.rpname = tmp[4];
  }

  getProductList() {
    this.objRevenueSer.GetRPlist().subscribe(response => {
      this.ProductList = response;
    });
  }

  editProduct(id: any, cat: any, pro: any, per: any, rpn: any) {
    const allparam = id + '**' + cat + '**' + pro + '**' + per + '**' + rpn;
    this.objRevenueSer.SendProductId(allparam);
  }
}
