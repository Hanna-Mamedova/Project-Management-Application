import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Signin, Signup, User } from 'src/app/core/models/interfaces';
import { UserRequestService } from 'src/app/core/services/users/user-request.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  userName$ = new BehaviorSubject<string>(localStorage.getItem('userName')!);

  sub: Subscription;

  constructor(private http: HttpClient, private userReqService: UserRequestService) {}

  public registerUser(body: Signup): Observable<Signup> {
    return this.http.post<Signup>('/signup', body);
  }

  public login(body: Signin): Observable<Signin> {
    return this.http.post<Signin>('/signin', body);
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
    this.userReqService.getUserById(user.userId).subscribe(data => {
      localStorage.setItem('userName', data.name);
      return this.userName$.next(data.name);
    });
  }
}
