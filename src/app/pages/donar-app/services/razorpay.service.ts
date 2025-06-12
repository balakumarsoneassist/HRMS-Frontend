import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RazorpayService {
    private readonly http = inject(HttpClient);

    constructor() { }

    verifyPayment(payload:any): Observable<any>{
       return  this.http.post(`${environment.apiUrl}/verify-payment`, payload)
    }
}
