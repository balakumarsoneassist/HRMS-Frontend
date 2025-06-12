import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DonationService {
  private readonly http = inject(HttpClient);

  getAllDonations(page: number, limit: number, search: string): Observable<any> {
    const params = {
      page,
      limit,
      search: search || ''
    };
    return this.http.get(`${environment.apiUrl}/getDonations`, { params });
  }

}
