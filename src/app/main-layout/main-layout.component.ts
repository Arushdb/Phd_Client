// src/app/layouts/main-layout.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { RoleMenuComponent } from '../role-menu/role-menu.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RoleMenuComponent],
  template: `
  <ng-template>  
  <header class="topbar" role="banner">
      <div class="topbar-inner">
        <div class="brand">
          <div class="univ-name">Main Layout Dayalbagh Educational Institute</div>
          <div class="univ-sub">PhD Registration Portal</div>
        </div>
        <app-role-menu></app-role-menu>
        <div class="actions">
          <button class="btn-logout" (click)="logout()">Logout</button>
        </div>
      </div>
    </header>
</ng-template>
    <main class="app-content">
      <router-outlet></router-outlet>
    </main>
    
  `,
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
