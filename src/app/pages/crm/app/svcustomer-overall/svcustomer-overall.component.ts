import { Component, OnInit } from '@angular/core';
import { SalesVisitService } from '../services/salesvisit/salesvisit.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-svcustomer-overall',
  templateUrl: './svcustomer-overall.component.html',
  styleUrls: ['./svcustomer-overall.component.css'],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    InputTextModule,
    FormsModule,
    SearchpipePipe
],
  providers: [MessageService]
})
export class SvcustomerOverallComponent implements OnInit {
  custList: any[] = [];
  searchStr = '';

  constructor(
    private objSalesService: SalesVisitService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    this.objSalesService.GetSVoveralllist().subscribe({
      next: (res) => {
        this.custList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal server error while fetching customer data'
        });
      }
    });
  }

  openEmpTrack(id: any, ename: any) {
    localStorage.setItem('empid1', id);
    localStorage.setItem('followerName1', ename);
    this.router.navigate(['home/svcmycust']);
  }
}
