// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UnknownUrlGuard } from './guards/unknown-url.guard';
import { MonthAcademicComponent } from './month-academic/month-academic.component';
import { ScholarRegistrationComponent } from './scholar-registration/scholar-registration.component';
import { ReviewProgressReportComponent } from './progress-report/review-progress-report/review-progress-report.component';
import { ReviewerDashboardComponent } from './progress-report/reviewer-dashboard/reviewer-dashboard.component';


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
      { path: 'dashboardadmin', component: DashboardComponent },
      { path: 'dashboardscholar', component: DashboardComponent },
      { path: 'yearmonth', component: MonthAcademicComponent },
      { path: 'ScholarRegistration', component: ScholarRegistrationComponent },
     
     
      { path: 'progress-report/review', component: ReviewProgressReportComponent },
      { path: 'dashboardreviewer', component: ReviewerDashboardComponent },

{
  path: 'scholar/dashboard',
  loadComponent: () =>
    import('./scholar/scholar-dashboard/scholar-dashboard.component')
      .then(m => m.ScholarDashboardComponent)
},
{
  path: 'scholar/progress-entry/:semester',
  loadComponent: () =>
    import('./progress-report/scholar-progress-entry/scholar-progress-entry.component')
      .then(m => m.ScholarProgressEntryComponent)
}


      // { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**',
     canActivate: [UnknownUrlGuard], component: LoginComponent }
];
