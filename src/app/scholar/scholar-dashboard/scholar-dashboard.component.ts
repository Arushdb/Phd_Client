import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ScholarService } from '../../services/scholar.service';
import { Scholar } from '../../models/scholar';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-scholar-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scholar-dashboard.component.html'
})
export class ScholarDashboardComponent implements OnInit {


  // 🔹 Mock data (replace with API response)
  scholar:Scholar | null = null;

  currentProgress = {
    reportId: 42,
    semester: 'July–Dec 2025',
    status: 'REVISION_REQUIRED',  // UNDER_REVIEW | APPROVED
    nextActions: 'Clarify methodology and resubmit',
    submittedOn: '05 Jan 2026',
    startdate: '2025-07-01',
    enddate: '2025-12-31',
    semesterid: 202501
    
  };
  

  constructor(private router: Router,
   
    private scholarservice: ScholarService,
    private messageservice:MessageService
   
  ) {}

  ngOnInit(): void {
    //debugger;
    //console.log('Logged in user:', this.user ? JSON.parse(this.user).name : null);
   // console.log('Logged in id:', this.user ? JSON.parse(this.user).id : null);
    //const userid = this.user ? JSON.parse(this.user).id : null;
  
    this.scholarservice.getScholarProfile().subscribe({
    next: (res) => {
      console.log('Scholar profile response:', res);
      if (res.success && res.data) {
        this.scholar = res.data.scholar;
        this.currentProgress.reportId = res.data.reportId;
        this.currentProgress.status = res.data.progressStatus;
        this.currentProgress.nextActions = res.data.nextActions;
        this.currentProgress.submittedOn = res.data.submittedOn;  
        this.currentProgress.semester = res.data.semestername;
        this.currentProgress.startdate = res.data.startdate;
        this.currentProgress.enddate = res.data.enddate;
        this.currentProgress.semesterid = res.data.semesterRegistrationId;

        console.log('Scholar profile loaded:', this.scholar);
        this.messageservice.showSuccess('Scholar profile loaded successfully');

      }
    },
    error: (err) => {
    //  this.errorMessage.set(err.error?.message || 'Failed to load scholar data');
   
   this.messageservice.showError(err.error?.message || 'Failed to load scholar data');
    }
  });
}


  enterOrEditProgress(): void {

    
    if (!this.currentProgress.reportId) {
      
      this.router.navigate(['/scholar/progress-entry', this.currentProgress.semester], 
        { queryParams: { semesterid: this.currentProgress.semesterid, startdate: this.currentProgress.startdate, enddate: this.currentProgress.enddate,} });
      return;
    } else {
      this.router.navigate(['/scholar/progress-entry', this.currentProgress.semester], { queryParams: 
        { semesterid: this.currentProgress.semesterid, reportId: this.currentProgress.reportId, startdate: this.currentProgress.startdate, enddate: this.currentProgress.enddate } });
    }
    
  }

  isEnterEnabled(status: string): boolean {
  return ['NOT_CREATED', 'DRAFT', 'REVISION_REQUIRED']
         .includes(status);
}
}
