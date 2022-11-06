import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { envUrl } from '../environments/env';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('./assets/locale/') !== -1) {
      return next.handle(request);
    }

    request = request.clone({
      url: `${envUrl.API_URL}${request.url}`,
    });
    return next.handle(request);
  }
}
