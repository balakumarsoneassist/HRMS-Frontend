import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CashDonationService {
    private readonly http = inject(HttpClient);

    createDonations(data: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/cash-donation`, data);
    }

    updateDonations(data: any, id: number): Observable<any> {
        const params = {
            id: id
        }
        return this.http.post(`${environment.apiUrl}/cash-donation`, data, { params });
    }

    getAllcashDonation() {
        return this.http.get(`${environment.apiUrl}/cash-donation`);
    }

    getoneCashDonations(id: number): Observable<any> {
        const params = {
            id: id
        }
        return this.http.post(`${environment.apiUrl}/cash-donation`, { params });
    }

}
