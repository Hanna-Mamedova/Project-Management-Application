import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('./assets/locale/') !== -1) {
      return next.handle(request);
    }

    request = request.clone({
      url: `https://app-production-ec55.up.railway.app${request.url}`,
    });
    return next.handle(request);
  }
}
