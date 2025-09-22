import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayloadService {
  private apiUrl = `${environment.apiUrl.replace(/\/+$/, '')}/api/payload`;

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      // Remove 'Bearer ' prefix if it exists, then add it back
      const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      headers = headers.set('Authorization', `Bearer ${cleanToken}`);
    }
    return headers;
  }

  // Create Payload (POST API)

  createPayload(data: any): Observable<any> {
    const userId = localStorage.getItem('user_id');
    console.log(userId);
    if (!userId) {
      throw new Error("user_id not found in localStorage");
    }

    const payloadData = {
      ...data,
      user_id: userId   // attach user_id here
    };
    return this.http.post<any>(this.apiUrl, payloadData, { headers: this.authHeaders() });
  }

  // Get all Payloads - to check what's saved in database
  getPayloads(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.authHeaders() })

  }

  getPayloadsByUser(): Observable<any> {
    const userId = localStorage.getItem('user_id'); // get from localStorage
  if (!userId) {
    throw new Error("user_id not found in localStorage");
  }
    const url = `${this.apiUrl}?user_id=${encodeURIComponent(userId)}`;
    return this.http.get<any>(url, { headers: this.authHeaders() });
  }



  // (optional) Get Payload by id
  getPayloadById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.authHeaders() });
  }

}
