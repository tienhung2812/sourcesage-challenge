import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.API_URL;


  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<any> {
    let data = {
      "email": email,
      "password": password
    }

    return this.http.post(`${this.API_URL}/auth/login`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  signup(name: string, email: string, password: string, gender:number, age: number): Observable<any> {
    let data = {
      "email": email,
      "password": password,
      "name":name,
      "age":age,
      "gender":gender
    }


    return this.http.post(`${this.API_URL}/auth/register`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  logout(){
    this.cookieService.delete('token');
    this.router.navigate(['/auth/login'])
  }
}
