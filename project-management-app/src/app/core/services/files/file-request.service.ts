import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileRequestService {

  constructor(private http: HttpClient) { }

  uploadFile(body: FormData): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      }),
    };
    return this.http.post('/file', body, httpOptions);
  }

  downloadFile(taskId: string, filename: string): Observable<Object> {
    return this.http.get(`/file/${taskId}/${filename}`, { responseType: 'blob' });
  }
}
