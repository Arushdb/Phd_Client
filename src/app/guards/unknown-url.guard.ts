// unknown-url.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UnknownUrlGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Log out the user
    this.auth.logout();
    // Redirect to login
    this.router.navigate(['/auth/login']);
    return false;  // navigation to wildcard route will not proceed
  }
}
