// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const requiredRoles: string[] = route.data['roles'] ?? [];
    if (!requiredRoles.length) return true; // no role restriction

    if (this.auth.hasRole(...(requiredRoles as any))) {
      return true;
    }

    // Redirect to login or unauthorized page:
    return this.router.parseUrl('/auth/login');
  }
}
