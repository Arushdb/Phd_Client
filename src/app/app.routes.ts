// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UnknownUrlGuard } from './guards/unknown-url.guard';


export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
     canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
     // { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**',
     canActivate: [UnknownUrlGuard], component: LoginComponent }
];
