import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface User {
    registernumber: string;
    name: string;
    email: string;
    mobilenumber: string;
    registrationdate: string;
    blockeddate: string | null;
    blockedstatus: string;
    verificationdate: string;
    gender: string;
    address: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    donor_category: string;
    donation_purpose: string;
    profilepic: string;
    membershipStatus: number;
}
@Injectable({
    providedIn: 'root'
})
export class AllUserDetailsService {
    private readonly http = inject(HttpClient);

    constructor() { }
   getallUsers(page: number, limit: number, globalFilter: any, userStatus?: string): Observable<any> {
    let params: any = {
        page,
        limit,
        search: globalFilter || ''
    };

    if (userStatus) {
        params.userStatus = userStatus;
    }

    return this.http.get(`${environment.apiUrl}/users`, { params });
}

getallNewUsers(page: number, limit: number, globalFilter: any): Observable<any> {
    let params: any = {
        page,
        limit,
        search: globalFilter || ''
    };

    return this.http.get(`${environment.apiUrl}/newusers`, { params });
}

    loadUser(username: string, token: string) {
        const url = `${environment.apiUrl}/user?username=${encodeURIComponent(username)}`;

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        this.http.get<User>(url, { headers }).subscribe({
            next: (allUsers) => {
                return allUsers// Save to local storage
            },
            error: (err) => {
                console.error('Failed to load Alluser', err); // Clear storage on error
            }
        });
    }

    modifyUserStatus(username: string, userStatus: string): Observable<any> {
        return this.http.post<any>(
            `${environment.apiUrl}/updateUserStatus`, {
            "username": username,
            "userStatus": userStatus
        },

        );
    }
}
