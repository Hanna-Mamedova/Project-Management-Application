import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardRequestService {
  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('/boards');
  }

  getBoardById(id: string): Observable<Object> {
    return this.http.get(`/boards/${id}`);
  }

  createBoard(body: Board): Observable<Object> {
    return this.http.post('/boards', body);
  }

  updateBoard(id: string, body: Board): Observable<Object> {
    return this.http.put(`/boards/${id}`, body);
  }

  deleteBoard(id: string): Observable<Object> {
    return this.http.delete(`/boards/${id}`);
  }
}
