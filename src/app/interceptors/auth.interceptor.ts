import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginStatusService } from '../auth/login-status.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginStatusService: LoginStatusService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('Movie')) {
      return next.handle(request);
    }

    const modifiedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginStatusService.getUserToken()}`,
      },
    });
    return next.handle(modifiedReq);
  }
}
