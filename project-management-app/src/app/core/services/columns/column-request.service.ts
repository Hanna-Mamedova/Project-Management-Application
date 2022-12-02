import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Column, UpdateColumnRequest, UpdateColumnRespond } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ColumnRequestService {
  constructor(private http: HttpClient) { }

  getColumns(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(`/boards/${boardId}/columns`);
  }

  getColumnById( boardId: string, id: string): Observable<Column> {
    return this.http.get<Column>(`/boards/${boardId}/columns/${id}`);
  }

  createColumn(boardId: string, body: Column): Observable<Column> {
    return this.http.post<Column>(`/boards/${boardId}/columns`, body);
  }

  updateColumn(boardId: string, id: string, body: UpdateColumnRequest): Observable<UpdateColumnRespond> {
    return this.http.put<UpdateColumnRespond>(`/boards/${boardId}/columns/${id}`, body);
  }

  deleteColumn(boardId: string, id: string): Observable<Object> {
    return this.http.delete(`/boards/${boardId}/columns/${id}`);
  }
}
