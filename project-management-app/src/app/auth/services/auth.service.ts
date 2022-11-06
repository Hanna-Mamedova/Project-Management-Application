import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signin, Signup } from 'src/app/core/models/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  public registerUser(body: Signup): Observable<Object> {
    return this.http.post('/signup', body);
  }

  public login(body: Signin): Observable<Object> {
    return this.http.post('/signin', body);
  }
}
