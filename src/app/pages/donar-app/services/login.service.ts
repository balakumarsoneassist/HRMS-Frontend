import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs/operators';

import { UserDetailsService, User } from '../services/user-details.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = `${environment.apiUrl}/login`;
  private userStore = inject(UserDetailsService);  // ✅ inject the UserStore

  constructor(private http: HttpClient, private router : Router) {}

  login(username: string, password: string) {
    const payload = { username, password };

    return this.http.post<{ token: string }>(this.loginUrl, payload).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);

          // ✅ Parse the token to check the role
          const tokenPayload = this.decodeToken(response.token);

          if (tokenPayload?.role === 'user') {
            // ✅ Automatically load the user data into UserStore
            this.userStore.loadUser(tokenPayload.username,response.token);
          }
        }
      })
    );
  }

  logout() {
     localStorage.removeItem('oneAssistTokenStorage')
     this.router.navigate([''], { replaceUrl: true})
    // Optionally: this.userStore.clearUser(); if you want to clear user data
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserRole(): string | null {
    const payload = this.decodeToken(this.getToken());
    return payload?.role || null;
  }

  getUserName(): string | null {
    const payload = this.decodeToken(this.getToken());
    return payload?.username || null;
  }

  private decodeToken(token: string | null): any {
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
}
