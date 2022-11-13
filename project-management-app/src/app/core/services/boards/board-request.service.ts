import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Board } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})

export class BoardRequestService {
  boards$ = new BehaviorSubject<Board[]>([]);

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('/boards');
  }

  getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`/boards/${id}`);
  }

  createBoard(body: Omit<Board, 'id'>): Observable<Board> {
    return this.http.post<Board>('/boards', body);
  }

  /**
   * @todo check if body without id
   */

  updateBoard(id: string, body: Omit<Board, 'id'>): Observable<Board> {
    return this.http.put<Board>(`/boards/${id}`, body);
  }

  deleteBoard(id: string): Observable<void> {
    return this.http.delete<void>(`/boards/${id}`);
  }
}
