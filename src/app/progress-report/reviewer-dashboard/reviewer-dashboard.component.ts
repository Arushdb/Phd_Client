import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReviewerService } from '../../services/reviewer.service';
import { ReviewerDashboardModel } from '../../models/reviewer-dashboard.model';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reviewer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reviewer-dashboard.component.html'
})
export class ReviewerDashboardComponent {

  // 🔹 Mock data (replace with API call)
  assignedReports: ReviewerDashboardModel[] = [];
  isSupervisor:boolean = false;
    
  constructor(private router: Router,private reportService: ReportService) {}

  review(reportId: number): void {
    console.log("Report id",reportId);
    // Navigate to review screen
    this.router.navigate(['progress-report/review'], { queryParams: { reportId } });
  }

  ngOnInit(): void { 

   //this.reviewService.getDashboard().subscribe({
   this.reportService.getDashboard().subscribe({  
      next: (response) => {
        console.log('Dashboard data:', response);   
        if (response.success) {
          this.assignedReports = response.data;
        } else {
          console.error('Failed to load dashboard data:', response.message);
        }  
          const currentUser = localStorage.getItem('currentUser')|| '';
          let role: string[] = currentUser ? JSON.parse(currentUser).roles : '';
          console.log("Role in dashboard",role);
          this.isSupervisor = role.includes('ROLE_SUPERVISOR');
          console.log("Is Supervisor?", this.isSupervisor);
        

                                                     
  },     error: (error) => {
        console.error('Error fetching dashboard data:', error);
      }   
});
  } 
  
  // ✅ NEW: Mark Attendance Function
  markAttendance(r: any) {

    // ⚠️ Ensure scholarSemesterId exists
    if (!r.scholarSemesterId) {
      console.log("Scholar Semester ID missing for report", r);
      alert('Scholar Semester not available for this record');
      return;
    }

    this.router.navigate(['/attendance'], {
      queryParams: {
        scholarSemesterId: r.scholarSemesterId,
        scholarId: r.scholarId,
        semesterName: r.semesterName,
        totalsessions: r.totalsessions,
        attendedsessions: r.attendedsessions,
        attendancePercentage: r.attendancePercentage,
        attendanceremarks: r.attendanceremarks,
      }
    });
  }
}
