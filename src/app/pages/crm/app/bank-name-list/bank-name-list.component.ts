import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank/bank.service';
import { Bank } from '../model/bank/bank';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-bank-name-list',
  templateUrl: './bank-name-list.component.html',
  styleUrls: ['./bank-name-list.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FloatLabelModule
  ]
})
export class BankNameListComponent implements OnInit {
  form: FormGroup;
  BankList: Bank[] = [];
  loading = false;

  constructor(
    private bankService: BankService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
     this.GetBankNameList();
  this.bankService.bankRefreshObservable.subscribe(() => {
    this.GetBankNameList();
  });
  }

  GetBankNameList() {
    this.loading = true;
    this.bankService.GetBankList().subscribe({
      next: (response) => {
        this.BankList = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load bank list',
        });
      },
    });
  }

  editBank(bankdetail: Bank) {
    this.bankService.bankEdit({ bankdetail });
  }
}
