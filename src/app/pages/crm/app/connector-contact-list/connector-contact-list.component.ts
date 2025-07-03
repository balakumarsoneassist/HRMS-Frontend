import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {  MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

import { ContactService } from '../services/contact/contact.service';
import { LocationServiceService } from '../services/location/location-service.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-connector-contact-list',
  templateUrl: './connector-contact-list.component.html',
  styleUrls: ['./connector-contact-list.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule
  ]
})
export class ConnectorContactListComponent implements OnInit {
  @ViewChild('dt') table!: Table;

  connectorList: any[] = [];
  locationOptions: { label: string; value: any }[] = [];
  totalRecords = 0;
  loading = false;

  globalFilterValue = '';
  _objPageModel = new PaginationModel();

  constructor(
    private contactService: ContactService,
    private locationService: LocationServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadLocations();
    // initial load: will be triggered by lazy on table init
  }

  /**
   * Called on paginator, sort or filter events
   */
  loadConnectorContacts(event: any): void {
    this.loading = true;
    this._objPageModel.PageNumber = event.first / event.rows;
    this._objPageModel.PageRange = event.rows;
    this._objPageModel.SearchText = this.globalFilterValue;

    this.contactService.GetConnectorContactList(this._objPageModel).subscribe({
      next: (res: any[]) => {
        this.connectorList = res;
        this.totalRecords = res?.[0]?.TotalRows || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load contacts' });
      }
    });
  }

  private loadLocations(): void {
    this.locationService.GetLocationList().subscribe({
      next: (res) => {
        this.locationOptions = res.map((loc: any) => ({ label: loc.Location, value: loc.Id }));
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load locations' });
      }
    });
  }

  onLocationChange(id: number, locationId: any): void {
    this.loading = true;
    this.contactService.updateConnectorContact({ Id: id, LocationId: locationId }).subscribe({
      next: (ok: boolean) => {
        this.loading = false;
        this.messageService.add({ severity: ok ? 'success' : 'warn', summary: ok ? 'Updated' : 'No Change', detail: ok ? 'Location updated.' : 'No update performed.' });
        this.table.reset();
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failed.' });
      }
    });
  }
}
