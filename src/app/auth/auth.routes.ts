// src/app/auth/auth.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

// Named export (recommended)
export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

// If you prefer a default export, uncomment below:
// export default authRoutes;
