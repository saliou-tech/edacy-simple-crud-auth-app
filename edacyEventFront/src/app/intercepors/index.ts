
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { CorsInterceptor } from './cors.interceptor';
import { JwtTokenInterceptor } from './jwt-token.interceptor';

export const httpInterceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtTokenInterceptor,
    multi: true,
  },
  {
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CorsInterceptor,
    multi: true,
  },
/*  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  }*/,
  // Breaks Code for now

];
