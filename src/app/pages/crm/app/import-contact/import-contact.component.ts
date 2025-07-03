import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {  MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

import { ImportService } from '../services/Import/import.service';
import { Api } from '../services/api';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-import-contact',
  templateUrl: './import-contact.component.html',
  styleUrls: ['./import-contact.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    TableModule,
    ButtonModule,
    ToastModule,
    InputTextModule
  ]
})
export class ImportContactComponent implements OnInit {
  excelList: any[] = [];
  uploadForm!: FormGroup;

  // API endpoint constants
  importUrl: string = Api.ImportDataUrl;
  templateUrl: string = '/contactTemplete/Lead.csv';

  constructor(
    private fb: FormBuilder,
    private importService: ImportService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      file: [null]
    });
    this.loadExcelList();
  }

  /**
   * Triggered by p-fileUpload custom upload
   */
  onUpload(event: any): void {
    const file: File = event.files[0];
    this.importService.postFile(file).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
          this.loadExcelList();
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No records imported' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Upload failed' });
      }
    });
  }

  /**
   * Load list of imported/updated Excel records
   */
  loadExcelList(): void {
    this.importService.ImportExcelFileList().subscribe({
      next: (res: any[]) => {
        this.excelList = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load file list' });
      }
    });
  }

  downloadTemplate(): void {
    window.open(this.templateUrl, '_blank');
  }
}
