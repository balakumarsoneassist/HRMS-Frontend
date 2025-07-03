import { Component, OnInit } from '@angular/core';
import { LeadCreateParam1 } from '../model/leadcreation/leadcreate';
import { LeadcreationService } from '../services/leadcreation/leadcreationservice';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-leadsbyempid',
  templateUrl: './leadsbyempid.component.html',
  styleUrls: ['./leadsbyempid.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    FloatLabelModule
  ]
})
export class LeadsbyempidComponent implements OnInit {
  form: FormGroup;
  model: LeadCreateParam1 = new LeadCreateParam1();
  StatusList: any[] = [];
  lowner: any;
  hfdt = '';
  htdt = '';
  loading = false;

  constructor(
    private lcService: LeadcreationService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      SearchStr: ['']
    });
  }

  ngOnInit(): void {
    const fdt = localStorage.getItem('fdt') || '';
    const tdt = localStorage.getItem('tdt') || '';
    this.model.empid = Number(localStorage.getItem('empid1'));
    this.lowner = localStorage.getItem('followerName1');

    this.hfdt = fdt.substring(0, 16);
    this.htdt = tdt.substring(0, 16);

    this.model.Frdt = new Date(fdt);
    this.model.Todt = new Date(tdt);

    localStorage.removeItem('fdt');
    localStorage.removeItem('tdt');
    localStorage.removeItem('empid1');
    localStorage.removeItem('followerName1');

    this.GetReport();
  }

  GetReport(): void {
    this.loading = true;
    this.lcService.getLeadcreateDetailsReport(this.model).subscribe({
      next: (response) => {
        this.StatusList = response;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Details loaded successfully'
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Server Error'
        });
      }
    });
  }
}
