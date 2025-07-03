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
import { MultiloancustomersdetComponent } from '../multiloancustomersdet/multiloancustomersdet.component';

@Component({
  standalone: true,
  selector: 'app-multiloancustomers',
  templateUrl: './multiloancustomers.component.html',
  styleUrls: ['./multiloancustomers.component.css'],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    MultiloancustomersdetComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService]
})
export class MultiloancustomersComponent implements OnInit {
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
    this.getMultiLoanList();
  }

  get searchStr() : FormControl {
    return this.searchForm.get('searchStr') as FormControl;
  }

  getMultiLoanList() {
    this.catReportService.getMultiloanReport().subscribe({
      next: (res) => {
        this.categoryList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load multi-loan report'
        });
      }
    });
  }

  callStatus(cname: string, mno: string) {
    this.selectedProduct = `${cname}--${mno}`;
    this.catReportService.SendMLCCode(this.selectedProduct);
    this.catReportService.statusOpeningAcco();
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
