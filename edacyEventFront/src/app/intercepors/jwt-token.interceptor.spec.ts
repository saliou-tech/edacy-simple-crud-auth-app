import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

// @ts-ignore
import { jwtTokenInterceptor } from './jwt-token.interceptor';

describe('jwtTokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => jwtTokenInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
