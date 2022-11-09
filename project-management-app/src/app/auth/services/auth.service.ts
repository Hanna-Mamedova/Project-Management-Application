import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Signin, Signup, User } from 'src/app/core/models/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  public registerUser(body: Signup): Observable<Object> {
    return this.http.post('/signup', body);
  }

  public login(body: Signin): Observable<Object> {
    return this.http.post('/signin', body);
  }

  public parseToken(token: string): User {
    let base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);     
  }

  public saveUserAuthInfo(token: string): void {
    const user: User = this.parseToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.userId);
    this.isLoggedIn$.next(!!localStorage.getItem('token'));
  }
}
