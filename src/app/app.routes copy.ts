// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',redirectTo: 'auth/login',pathMatch: 'full'},
 { path: 'home', component: HomeComponent },
  
  {
  path: 'dashboard',
  loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  canActivate: [RoleGuard],          // RoleGuard allows when logged in and has roles
  data: { roles: ['ADMIN','FACULTY','SCHOLAR'] }
},

  // {
  //   path: 'students',
  //   //loadComponent: () => import('./pages/students/students.component').then(m => m.StudentsComponent),
  //   canActivate: [RoleGuard],
  //   data: { roles: ['ADMIN'] }
  // },

  // {
  //   path: 'applications',
  //   //loadComponent: () => import('./pages/applications/applications.component').then(m => m.ApplicationsComponent),
  //   canActivate: [RoleGuard],
  //   data: { roles: ['ADMIN','FACULTY'] }
  // },

  // {
  //   path: 'profile',
  //   //loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
  //   canActivate: [RoleGuard],
  //   data: { roles: ['SCHOLAR','FACULTY','ADMIN'] }
  // },

  // auth routes etc...
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },

  { path: '**', redirectTo: '' }
];
