import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Signin, Signup } from 'src/app/core/models/interfaces';

@Injectable()
export class AuthService {
  message$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  public registerUser(body: Signup): Observable<Object> {
    return this.http.post('/signup', body);
  }

  public login(body: Signin): Observable<Object> {
    return this.http.post('/signin', body);
  }
}
