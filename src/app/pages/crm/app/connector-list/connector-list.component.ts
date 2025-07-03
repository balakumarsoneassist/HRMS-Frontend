import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { connecterService } from '../services/connector/connecterService';
import { ConnectorFormModelComponent } from '../connector-form-model/connector-form-model.component';

@Component({
  standalone: true,
  selector: 'app-connector-list',
  templateUrl: './connector-list.component.html',
  styleUrls: ['./connector-list.component.css'],
  providers: [MessageService, ConfirmationService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    ConnectorFormModelComponent
  ]
})
export class ConnectorListComponent implements OnInit {
  connectorList: any[] = [];
  totalRecords = 0;
  loading = false;

  displayConnectorForm = false;
  selectedConnectorId!: number;

  constructor(
    private connectorService: connecterService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadConnectors();
  }

  private loadConnectors() {
    this.loading = true;
    this.connectorService.getConnectorList().subscribe({
      next: (res: any[]) => {
        this.connectorList = res;
        this.totalRecords = res.length;
        this.loading = false;
        this.messageService.clear();
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load connectors'
        });
      }
    });
  }

  openConnectorForm(id: number) {
    this.selectedConnectorId = id;
    this.displayConnectorForm = true;
  }

  onConnectorFormClose() {
    this.displayConnectorForm = false;
    this.loadConnectors();
  }
}
