import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly apiUrl = 'http://localhost:8080/api/user';

    constructor(private http: HttpClient) { }

    getUsers(page: number, limit: number, filterField?: string, searchText?: string): Observable<any> {
        let params = new HttpParams()
            .set('page', page)
            .set('limit', limit);

        if (filterField && searchText) {
            params = params.set(filterField, searchText);
        }

        return this.http.get<any>(this.apiUrl, { params });
    }

    createUser(data: any, currentUser: string): Observable<any> {
        if (currentUser == "Super Admin") {
            return this.http.post(this.apiUrl + '/superad', data);
        }
        else {
            return this.http.post(this.apiUrl, data);

        }
    }
}
