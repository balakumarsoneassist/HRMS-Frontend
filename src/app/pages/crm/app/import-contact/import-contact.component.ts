import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImportService } from '../services/Import/import.service';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'app-import-contact',
    templateUrl: './import-contact.component.html',
    styleUrls: ['./import-contact.component.css']
})
export class ImportContactComponent implements OnInit {
    ExcelList: any;
    ImportExcelList: any;

    constructor(private objImportDataservices: ImportService, private objapi: Api, private formBuilder: FormBuilder, private httpClient: HttpClient) {

    }
    ImportDataUrl: string = Api.ImportDataUrl
    ngOnInit(): void {
        this.ImportExcelFileList();
    }
    fileToUpload: File | null = null;
    handleFileInput(files: Event): void {
        const input = files.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.fileToUpload = input.files[0];
        } else {
            this.fileToUpload = null;
        }
    }
    uploadFileToActivity() {
        if (this.fileToUpload != null) {
            this.objImportDataservices.postFile(this.fileToUpload).subscribe({
                next: data => {
                    if (data === true) {
                        alert('File Uploaded Successfully');
                        this.ImportExcelFileList();
                        this.fileToUpload = null;
                    }
                },
                error: error => {
                    console.log(error);
                }
            });

        }
        else {
            alert('Please Select the File');
        }
    }
    ImportExcelFileList() {
        this.objImportDataservices.ImportExcelFileList().subscribe(
            response => {
                this.ExcelList = response
            },
            error => alert('InternalServer Error')
        )

    }
    downloadTemplete() {
        window.open('/assets/contactTemplete/Lead.csv', '_blank');
    }
}


