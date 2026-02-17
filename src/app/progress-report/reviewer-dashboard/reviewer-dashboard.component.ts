import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reviewer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reviewer-dashboard.component.html'
})
export class ReviewerDashboardComponent {

  // 🔹 Mock data (replace with API call)
  assignedReports = [
    {
      reportId: 42,
      scholarName: 'Rahul Sharma',
      enrollmentNo: 'PHD/2022/014',
      program: 'PhD (Computer Science)',
      session: 'July–Dec 2025',
      status: 'UNDER REVIEW'
    },
    {
      reportId: 45,
      scholarName: 'Neha Verma',
      enrollmentNo: 'PHD/2022/021',
      program: 'PhD (Physics)',
      session: 'July–Dec 2025',
      status: 'REVISION REQUIRED'
    }
  ];

  constructor(private router: Router) {}

  review(reportId: number): void {
    // Navigate to review screen
    this.router.navigate(['progress-report/review'], { queryParams: { reportId } });
  }
}
