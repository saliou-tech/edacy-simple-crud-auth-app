/*

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogService } from '../services/error-dialog.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorDialogService: ErrorDialogService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error?.error?.message !== 'FieldException')
          this.errorDialogService.openDialog(
            error.message ?? JSON.stringify(error),
            error.status
          );
        return throwError(error);
      })
    );
  }
}
*/
