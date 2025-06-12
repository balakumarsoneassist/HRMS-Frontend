import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private ImportDataUrl:string=Api.ImportDataUrl;
  private ExcelDataListUrl=Api.importExcelFileUrl;
  

  constructor(private objApi:Api,private http:HttpClient) { }
  SaveImportData(event)
  {
    return this.objApi.callPost(this.ImportDataUrl,event);
  }
  postFile(fileToUpload: File) {
    return this.objApi.CallFilePost(this.ImportDataUrl,fileToUpload);
  }
   ImportExcelFileList(){
    return this.objApi.callPost(this.ExcelDataListUrl);
   }
}
