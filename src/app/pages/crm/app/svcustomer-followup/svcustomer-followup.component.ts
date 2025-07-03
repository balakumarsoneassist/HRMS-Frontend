import { Component, OnInit } from '@angular/core';
import { SalesVisitService } from '../services/salesvisit/salesvisit.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SalesvisitComponent } from '../salesvisit/salesvisit.component';
import { CustomerextComponent } from '../customerext/customerext.component';
import { FormsModule } from '@angular/forms';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
  standalone: true,
  selector: 'app-svcustomer-followup',
  templateUrl: './svcustomer-followup.component.html',
  styleUrls: ['./svcustomer-followup.component.css'],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SalesvisitComponent,
    FormsModule,
    CustomerextComponent,
    SearchpipePipe
],
  providers: [MessageService]
})
export class SvcustomerFollowupComponent implements OnInit {
  SVcustomerList: any[] = [];
  searchStr = '';
  displayCustomerDialog = false;
  selectedCustomer: string | null = null;

  constructor(
    private svService: SalesVisitService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    this.svService.GetSVcustomerlist().subscribe({
      next: (res) => {
        this.SVcustomerList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to load customer list'
        });
      }
    });
  }

  callStatus(id: number, name: string, mno: string) {
    const tmp = `${id}**${name}**${mno}`;
    this.svService.statusOpeningAcco();
    this.svService.SendCustId(tmp);
    this.displayCustomerDialog = true;
  }

  closeCustomerDialog() {
    this.displayCustomerDialog = false;
  }
}
