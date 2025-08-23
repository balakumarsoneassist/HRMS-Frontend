import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetrolReimbursmentService {

  private baseUrl = 'http://localhost:3000/api/petrol'; // change to your API URL

  constructor(private http: HttpClient) { }

  getClaims(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addClaim(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateClaim(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteClaim(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
