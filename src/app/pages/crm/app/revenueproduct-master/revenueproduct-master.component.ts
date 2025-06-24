import { Component, OnInit } from '@angular/core';
import { RevenueProductModel } from '../model/revenue/revenuemodel';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-revenueproduct-master',
  templateUrl: './revenueproduct-master.component.html',
  styleUrls: ['./revenueproduct-master.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class RevenueproductMasterComponent implements OnInit {
  model: RevenueProductModel = new RevenueProductModel();

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
    this.model.id = 0;
    this.objRevenueSer.ProductidSendObservable.subscribe(response => {
      this.FillRPmaster(response);
    });
  }

  Generatepname() {
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

  SaveProduct() {
    this.Generatepname();
    this.objRevenueSer.SaveRevenueProduct(this.model).subscribe(
      response => {
        if (response === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved Successfully'
          });
          setTimeout(() => window.location.reload(), 1500);
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

  FillRPmaster(res: any) {
    const tmp = res.split('**');
    this.model.id = tmp[0];
    this.model.category = tmp[1];
    this.model.product = tmp[2];
    this.model.percentage = tmp[3];
    this.model.rpname = tmp[4];
  }
}
