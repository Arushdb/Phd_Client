import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // current user observable from AuthService
  currentUser$: Observable<User | null> ;

  // demo stats (replace with real API calls)
  totalScholars = 1240;
  applicationsPending = 37;
  supervisors = 186;
  publicationsThisYear = 52;

  // sample recent activity (replace with dynamic data)
  recentActivity = [
    { id: 1, text: 'Application #AP-2025-1001 submitted', time: '2h ago' },
    { id: 2, text: 'Supervisor Dr. Sharma approved candidate', time: '8h ago' },
    { id: 3, text: 'New announcement posted: Viva schedule', time: '1d ago' },
  ];

  constructor(private auth: AuthService) {
    this.currentUser$ = this.auth.currentUser$;
  }

  // hook to refresh stats (placeholder)
  refreshStats() {
    // TODO: call a service that returns real statistics
    // Simulate change for demo
    this.applicationsPending = Math.max(0, this.applicationsPending - 1);
  }
}
