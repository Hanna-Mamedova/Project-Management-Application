import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Column } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ColumnRequestService {
  constructor(private http: HttpClient) { }

  getColumns(boardId: string): Observable<Object> {
    return this.http.get(`/boards/${boardId}/columns`);
  }

  getColumnById( boardId: string, id: string): Observable<Object> {
    return this.http.get(`/boards/${boardId}/columns/${id}`);
  }

  createColumn(boardId: string, body: Column): Observable<Object> {
    return this.http.post(`/boards/${boardId}/columns`, body);
  }

  updateColumn(boardId: string, id: string, body: Column): Observable<Object> {
    return this.http.put(`/boards/${boardId}/columns/${id}`, body);
  }

  deleteColumn(boardId: string, id: string): Observable<Object> {
    return this.http.delete(`/boards/${boardId}/columns/${id}`);
  }
}
