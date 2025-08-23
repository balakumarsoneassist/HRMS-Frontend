import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:8080/api/attendance';

  constructor(private http: HttpClient) {}

  getDailyreport(page: number, limit: number, searchText?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (searchText) {
      params = params.set('attendanceType', searchText);
    }

    return this.http.get<any>(this.apiUrl+ `/dailyReports`, { params });
  }

   getMonthlyreport(page: number, limit: number, searchText?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (searchText) {
      params = params.set('attendanceType', searchText);
    }

    return this.http.get<any>(this.apiUrl+ `/monthlyReports`, { params });
  }



   getAttendance(page: number, limit: number, searchText?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (searchText) {
      params = params.set('attendanceType', searchText);
    }

    return this.http.get<any>(`${this.apiUrl}/pendinglist`, { params });
  }

    approveAttendance(id: string, approved: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/approval/${id}`, { approved });
  }
}
