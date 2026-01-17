// refresh-token.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, switchMap, filter, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  let authReq = req;
  const token = auth.accessToken;

  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status !== 401 || req.url.includes('/auth/refresh')) {
        return throwError(() => error);
      }
       debugger; 
      if (auth.refreshing) {
        return auth.refreshTokenSubject.pipe(
          filter(t => t !== null),
          take(1),
          switchMap(t =>
            next(req.clone({
              setHeaders: { Authorization: `Bearer ${t}` }
            }))                  
          )
        );
      }

      auth.refreshing = true;
      auth.refreshTokenSubject.next(null);

      return auth.refreshAccessToken().pipe(
        switchMap(res => {
          auth.refreshing = false;
          auth.setAccessToken(res.accessToken);
          auth.refreshTokenSubject.next(res.accessToken);

          return next(req.clone({
            setHeaders: { Authorization: `Bearer ${res.accessToken}` }
          }));
        }),
        catchError(err => {
          auth.refreshing = false;
          auth.logout('session-expired');
          return throwError(() => err);
        })
      );
    })
  );
};

