import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SupervisorGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {

    const userData = localStorage.getItem('currentUser');
let roles: string[] = [];

if (userData) {
  roles = JSON.parse(userData).roles || [];
}

   // let  roles: string[] = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '').roles : null;
    const allowedRoles = ['ROLE_SUPERVISOR'];

    // ✅ Allow only SUPERVISOR\
    console.log("Role in guard", roles);
    const hasAccess = roles.some(role => allowedRoles.includes(role));
   
     if (hasAccess) {

    return true;
  }else{

    // ❌ Block access
    alert('Access denied: Supervisor only');
     return this.router.createUrlTree(['/dashboard']);
  }
  }
}