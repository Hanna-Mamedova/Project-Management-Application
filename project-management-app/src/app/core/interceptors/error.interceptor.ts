import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, EMPTY } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toast: NotificationsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toast.error('Error', err.error.message, { timeOut: 3000 });
        return EMPTY;
      }),
    );
  }
}
