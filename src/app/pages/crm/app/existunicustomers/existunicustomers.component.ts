import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ExistloanwisecustomersComponent } from '../existloanwisecustomers/existloanwisecustomers.component';

@Component({
  standalone: true,
  selector: 'app-existunicustomers',
  templateUrl: './existunicustomers.component.html',
  styleUrls: ['./existunicustomers.component.css'],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    ExistloanwisecustomersComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MessageService]
})
export class ExistunicustomersComponent implements OnInit {
  categoryList: any[] = [];
  searchForm!: FormGroup;
  displayDialog: boolean = false;
  selectedProduct: string = '';

  constructor(
    private catReportService: CatReportService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchStr: ['']
    });
    localStorage.setItem('categorytype', '');
    this.getCategoryList();
  }

  get searchStr(): FormControl {
    return this.searchForm.get('searchStr') as FormControl;
  }

  getCategoryList() {
    this.catReportService.getUniCReport().subscribe({
      next: (res) => {
        this.categoryList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to load customer report'
        });
      }
    });
  }

  callStatus(product: string) {
    this.selectedProduct = product;
    this.catReportService.SendProductCode(product);
    this.catReportService.statusOpeningAcco();
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
