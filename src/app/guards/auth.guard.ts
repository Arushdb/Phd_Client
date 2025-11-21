// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService, User } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user: User | null) => {
        if (user) {
          // user is logged in
          return true;
        } else {
          // user not logged in, redirect to login
          return this.router.createUrlTree(['/auth/login']);
        }
      })
    );
  }
}
