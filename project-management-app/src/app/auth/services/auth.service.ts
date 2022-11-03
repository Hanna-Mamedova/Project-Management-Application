import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  message$ = new BehaviorSubject<string>('');

  token = {};

  // body = {
  //   name: 'Vasiley',
  //   login: 'username',
  //   password: 'password',
  // };

  body = {
    login: 'username',
    password: 'password',
  };

  constructor(private http: HttpClient) {}

  public getMessage(): void {
    // this.http.get(this.url).subscribe(data => this.message$.next(JSON.stringify(data)));
    // this.http.post(`${envUrl.API_URL}/signin`, this.body).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     return this.token = data;
    //   },
    //   error: error => console.log(error),
    // });
    // let header = new HttpHeaders().set({
    //   'Content-Type' : 'application/json; charset=utf-8',
    //   'Accept'       : 'application/json',
    // });
    // this.http.get(`${envUrl.API_URL}/users`).subscribe(data => console.log(data));
    this.http.get( '/users').subscribe(data => console.log(data));
  }
}
