import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Signin, Signup } from 'src/app/core/models/interfaces';

@Injectable()
export class AuthService implements OnDestroy {
  message$ = new BehaviorSubject<string>('');

  registerSub: Subscription;

  loginSub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this.registerSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

  public registerUser(body: Signup): void {
    this.registerSub = this.http.post('/signup', body).subscribe({
      next: data => this.message$.next((data as Signup).login + ' was registered successfully!'),
      error: data => console.log(data.status),
    });
  }

  public login(body: Signin): void {
    this.loginSub = this.http.post('/signin', body).subscribe({
      next: data => sessionStorage.setItem('token', JSON.stringify(data)),
      error: data => console.log(data.status),
    });
  }
}
