import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-custratingreport',
  templateUrl: './custratingreport.component.html',
  styleUrls: ['./custratingreport.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ButtonModule
  ],
  providers: [MessageService]
})
export class CustratingreportComponent implements OnInit {
  categoryList: any[] = [];
  searchForm!: FormGroup;

  constructor(
    private catReportService: CatReportService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('categorytype', '');
    this.searchForm = this.fb.group({
      searchStr: ['']
    });
    this.getCategoryList();
  }

  get searchStr() : FormControl {
    return this.searchForm.get('searchStr')  as FormControl;
  }

  getCategoryList() {
    this.catReportService.getCategoryReport().subscribe({
      next: (res) => {
        this.categoryList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load category report'
        });
      }
    });
  }

  callStatus(ctype: string) {
    localStorage.setItem('segname', ctype);
    this.router.navigate(['home/custratingdet']);
  }
}
