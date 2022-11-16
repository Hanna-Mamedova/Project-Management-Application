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
import { Messages, TOAST_TIMEOUT } from '../constants/constants';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: NotificationsService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['auth/login']);
        }
        this.toastService.error(Messages.ERROR, err.error.message, { timeOut: TOAST_TIMEOUT });
        return EMPTY;
      }),
    );
  }
}
