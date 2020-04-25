import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  private getHeaders(){
    let token = this.cookieService.get('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    }
  }

  profile(): Observable<any> {

    return this.http.get(`${this.API_URL}/auth/me`, this.getHeaders());
  }
}
