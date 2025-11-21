// src/app/layouts/auth-layout.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .auth-layout {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  `]
})
export class AuthLayoutComponent {}
