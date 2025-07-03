import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeadCreateParam } from '../model/leadcreation/leadcreate';
import { LeadcreationService } from '../services/leadcreation/leadcreationservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-leadcreator',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    ButtonModule,
    ToastModule,
    FloatLabelModule
  ],
  providers: [MessageService],
  templateUrl: './leadcreator.component.html',
  styleUrls: ['./leadcreator.component.css'],
})
export class LeadcreatorComponent implements OnInit {
  form: FormGroup;
  StatusList: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private lcService: LeadcreationService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      SearchStr: [''],
      Frdt: [null],
      Todt: [null],
    });
  }

  ngOnInit(): void {}

  GetReport() {
    const payload: any = {
      Frdt: this.form.get('Frdt')?.value,
      Todt: this.form.get('Todt')?.value,
    };

    console.log(payload);

    this.loading = true;
    this.lcService.getLeadcreateReport(payload).subscribe({
      next: (response) => {
        this.StatusList = response;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Report loaded successfully',
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Server Error',
        });
      },
    });
  }

  getDetails(id: any, name: any) {
    localStorage.setItem('empid1', id);
    localStorage.setItem('followerName1', name);
    localStorage.setItem('fdt', this.form.get('Frdt')?.value);
    localStorage.setItem('tdt', this.form.get('Todt')?.value);
    this.router.navigate(['home/leadbyeid']);
  }
}
