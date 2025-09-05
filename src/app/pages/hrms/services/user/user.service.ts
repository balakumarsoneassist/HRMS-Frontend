import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/api/user`;

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  // -------- Users CRUD --------
  getUsers(page: number, limit: number, filterField?: string, searchText?: string): Observable<any> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (filterField && searchText) {
      params = params.set(filterField, searchText);
    }
    return this.http.get<any>(this.apiUrl, { params, headers: this.authHeaders() });
  }

  createUser(data: any, currentUser: string): Observable<any> {
    if (currentUser === 'Super Admin') {
      return this.http.post(`${this.apiUrl}/superad`, data, { headers: this.authHeaders() });
    } else {
      return this.http.post(this.apiUrl, data, { headers: this.authHeaders() });
    }
  }

  // -------- Admin Dashboard --------
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/dashboard/stats`, { headers: this.authHeaders() });
  }

  // -------- Profile --------
  getProfile(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.authHeaders() });
  }

  getLeaveTiles(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/leave-type/${id}`, { headers: this.authHeaders() });
  }

  getPetrolBalance(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/petrol/totalApproved/${id}`, { headers: this.authHeaders() });
  }

  // -------- Attendance --------
  getAttendanceSummary(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/attendance/summary/${id}`, { headers: this.authHeaders() });
  }

  checkAttendance(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/attendance/present/check`, { headers: this.authHeaders() });
  }

  loginAttendance(payload: { lat: number; lon: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/attendance/present/login`, payload, { headers: this.authHeaders() });
  }

  logoutAttendance(payload: { lat: number; lon: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/attendance/present/logout`, payload, { headers: this.authHeaders() });
  }

  // -------- Password --------
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/user/change-password`,
      { currentPassword, newPassword },
      { headers: this.authHeaders() }
    );
  }
}
