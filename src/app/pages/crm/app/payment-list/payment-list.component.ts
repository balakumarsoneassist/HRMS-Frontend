import { Component, OnInit } from '@angular/core';
import { PaginationModel } from '../model/Contact/ContactModel';
import { connecterService } from '../services/connector/connecterService';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ToastModule,
    TableModule,
    ButtonModule,
  ]
})
export class PaymentListComponent implements OnInit {
  paginationModel: PaginationModel;
  paymentList: any[] = [];
  loading = false;

  constructor(
    private connectorService: connecterService,
    private messageService: MessageService
  ) {
    this.paginationModel = new PaginationModel();
  }

  ngOnInit(): void {
    this.getPaymentList();
  }

  getPaymentList() {
    this.loading = true;
    this.paginationModel.PageNumber = 0;
    this.connectorService.getPaymentList(this.paginationModel).subscribe({
      next: (res) => {
        this.paymentList = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load payments'
        });
      }
    });
  }

  updateConnectorPayment(Id: number) {
    this.connectorService.updateConnectorPayment(Id).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Payment updated successfully'
          });
          this.getPaymentList();
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not update payment'
        });
      }
    });
  }
}
