import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserRequestService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<Object> {
    return this.http.get('/users');
  }

  getUserById(id: string): Observable<Object> {
    return this.http.get(`/users/${id}`);
  }

  updateUser(id: string, body: Signup): Observable<Object> {
    return this.http.put(`/users/${id}`, body);
  }

  deleteUser(id: string): Observable<Object> {
    return this.http.delete(`/users/${id}`);
  }
}
