import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  totalUsers = 0;
  totalScholars = 0;
  pendingReports = 0;
   // current user observable from AuthService
    currentUser$: Observable<User | null> ;

  
    constructor(private auth: AuthService) {
      this.currentUser$ = this.auth.currentUser$;
    }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    // 🔥 Replace with API calls
    this.totalUsers = 120;
    this.totalScholars = 80;
    this.pendingReports = 25;
  }

}