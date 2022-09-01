import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}
  /**
   * We don't have a lot of data (or any data, for that matter)
   * regarding the types of exceptions/errors our endpoints
   * are going to throw, so this interceptor will pretty much
   * only be useful for 500 errors.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.toastr.error(err.error.message);
        } else if (err.status >= 500) {
          this.toastr.error('خطایی رخ داده است.');
        }

        return throwError(() => new Error(err.error.non_field_errors));
      })
    );
  }
}
