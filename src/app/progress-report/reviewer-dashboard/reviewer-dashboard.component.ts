import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReviewerService } from '../../services/reviewer.service';
import { ReviewerDashboardModel } from '../../models/reviewer-dashboard.model';

@Component({
  selector: 'app-reviewer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reviewer-dashboard.component.html'
})
export class ReviewerDashboardComponent {

  // 🔹 Mock data (replace with API call)
  assignedReports: ReviewerDashboardModel[] = [];
    
  constructor(private router: Router,private reviewService: ReviewerService) {}

  review(reportId: number): void {
    console.log("Report id",reportId);
    // Navigate to review screen
    this.router.navigate(['progress-report/review'], { queryParams: { reportId } });
  }

  ngOnInit(): void { 

   this.reviewService.getDashboard().subscribe({
      next: (response) => {
        console.log('Dashboard data:', response);   
        if (response.success) {
          this.assignedReports = response.data;
        } else {
          console.error('Failed to load dashboard data:', response.message);
        }         
  },     error: (error) => {
        console.error('Error fetching dashboard data:', error);
      }   
});
  }   
}
