
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
    membershipStatus : number;
}


@Injectable({ providedIn: 'root' })
export class UserDetailsService {
    private readonly http = inject(HttpClient);
    private userSubject = new BehaviorSubject<User | null>(this.loadUserFromStorage());
    user$ = this.userSubject.asObservable();

    private STORAGE_KEY = 'userDetails';

    private loadUserFromStorage(): User | null {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    }

    private saveUserToStorage(user: User | null) {
        if (user) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }

    loadUser(username: string, token: string) {
        const url = `${environment.apiUrl}/user?username=${encodeURIComponent(username)}`;

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        this.http.get<User>(url, { headers }).subscribe({
            next: (user) => {
                this.userSubject.next(user);
                this.saveUserToStorage(user); // Save to local storage
            },
            error: (err) => {
                console.error('Failed to load user', err);
                this.userSubject.next(null);
                this.saveUserToStorage(null); // Clear storage on error
            }
        });
    }

    membershipApply(): Observable<any>{
        const payload = {
            "membershipApply": "Applied"
          }
        return this.http.post(
            `${environment.apiUrl}/updatemembership`,payload,

          );
    }

    get userSnapshot(): User | null {
        return this.userSubject.value;
    }

    clearUser() {
        this.userSubject.next(null);
        this.saveUserToStorage(null);
    }
}


