import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.API_URL;


  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<any> {
    let data = {
      "email": email,
      "password": password
    }
    return this.http.get('https://api.npms.io/v2/search?q=scope:angular');

    // return this.http.post(`${this.API_URL}`, data, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // });
  }

  signup(name: string, email: string, password: string, gender:number, age: number): Observable<any> {
    let data = {
      "email": email,
      "password": password
    }

    return this.http.get('https://api.npms.io/v2/search?q=scope:angular');
    // return this.http.post(`${this.API_URL}`, data, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // });
  }
}
