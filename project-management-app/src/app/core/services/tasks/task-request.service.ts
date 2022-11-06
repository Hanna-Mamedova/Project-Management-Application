import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskRequestService {
  constructor(private http: HttpClient) { }

  getTasks(boardId: string, columnId: string): Observable<Object> {
    return this.http.get(`/boards/${boardId}/columns/${columnId}/tasks`);
  }

  getTaskById( boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.http.get(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  createTask(boardId: string, columnId: string, body: Task): Observable<Object> {
    return this.http.post(`/boards/${boardId}/columns/${columnId}/tasks`, body);
  }

  updateTask(boardId: string, columnId: string, taskId: string, body: Task): Observable<Object> {
    return this.http.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, body);
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.http.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }
}
