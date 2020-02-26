import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
let httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  isRegistered: boolean;
  constructor(private http: HttpClient) { }
  registerUser(user): Observable<any> {
    return this.http.post<any>("http://localhost:5000/users/register", user, httpOptions);
  }
  loginUser(user): Observable<any> {
    return this.http.post<any>("http://localhost:5000/users/login", user, httpOptions);
  }
  storeUserData(): Observable<any> {
    this.authToken = localStorage.getItem('x-auth-token');
    let options = {
      headers: new HttpHeaders({
        "x-auth-token": this.authToken,
        "Content-type": 'application/json'
      })
    }
    return this.http.get<any>('http://localhost:5000/users/auth', options);
  }
  logout() {
    localStorage.clear();
  }
}
