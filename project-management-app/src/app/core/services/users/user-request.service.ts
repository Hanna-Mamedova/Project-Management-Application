import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup, User } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserRequestService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<User>('/users');
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`/users/${id}`);
  }

  updateUser(id: string, body: Signup): Observable<Signup> {
    return this.http.put<Signup>(`/users/${id}`, body);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`/users/${id}`);
  }
}
