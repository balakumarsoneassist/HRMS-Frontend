import { Component, OnInit } from '@angular/core';
import { ImportService } from '../services/Import/import.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports:[CommonModule,FormsModule],
  selector: 'app-import-excel-file-list',
  templateUrl: './import-excel-file-list.component.html',
  styleUrls: ['./import-excel-file-list.component.css']
})
export class ImportExcelFileListComponent implements OnInit {
  ExcelList:any;
  ImportExcelList:any;

  constructor(private objImportservice:ImportService) { }

  ngOnInit(): void {
    this.ImportExcelFileList();
  }
  ImportExcelFileList(){
    this.objImportservice.ImportExcelFileList().subscribe({
        next :  Response =>{
        this.ExcelList=Response
      },
      error :error => alert('InternalServer Error')
    }

    )

  }

}
