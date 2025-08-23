import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private apiUrl = 'http://localhost:8080/api/access';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any>{
       return this.http.get<any>(this.apiUrl);

  }

   getLeavePoliciesByRolesStrings(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/leave-policies/roles');
  }
}
