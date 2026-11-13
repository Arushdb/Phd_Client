import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const token = authService.accessToken;

  let headers: any = {
    'X-APPLICATION-ID': 'PHD'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const authReq = req.clone({
    setHeaders: headers,
    withCredentials: true
  });

  return next(authReq);
};

