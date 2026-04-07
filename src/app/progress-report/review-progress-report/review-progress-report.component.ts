import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewerDocumentsComponent } from '../reviewer-documents/reviewer-documents.component';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RemarkThreadComponent } from '../remark-thread/remark-thread.component';
import { ReviewerRemarksComponent } from '../reviewer-remarks/reviewer-remarks.component';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewerService } from '../../services/reviewer.service';
import { RemarkService } from '../../services/remark.service';
import { ReportService } from '../../services/report.service';
@Component({
  selector: 'app-review-progress-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RemarkThreadComponent,
    ReviewerRemarksComponent,
    ReviewerDocumentsComponent,
  ],
  templateUrl: './review-progress-report.component.html',
})
export class ReviewProgressReportComponent {
  reportId!: number;

  scholar: any = {};
  report: any = {};
  attendance: any = {};
  documents: any[] = [];
  remarkThreads: any[] = [];

  /* ===== Review Form ===== */
  reviewForm: FormGroup;
  programname: any;
  fullName: any;
  enrolmentno: any;
  scholarId: any;
  currentRole: string = 'SUPERVISOR'; // TODO: get from auth service
  reviewerremarks: any[] = [];
  progressStatus: any;
  nextActions: any;
  overallRemarks: any;
  attendanceremarks: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    readonly router: Router,
    private reviewerService: ReviewerService,
    private reportService: ReportService
    
  ) {
    this.reviewForm = this.fb.group({
      decision: ['', Validators.required],
      remarks: [''],
    });
  }

  /* ===== Eligibility rule ===== */
  get eligible(): boolean {
    return this.attendance >= 75;
  }

  /* ===== Save Review ===== */
  save(): void {
   if (!this.eligible && this.reviewForm.value.decision === 'APPROVED') {
  alert('Attendance below minimum eligibility. Approval not allowed.');
  return;
}

const decision = this.reviewForm.value.decision;
console.log('Selected decision:', decision);

if (!decision) {
  alert('Please select a decision');
  return;
}
if (decision === 'DRAFT') {
  alert('Please select a decision');
  return;
}

    if (this.reviewForm.invalid) {
      return;
    }

    const payload = {
      reportId: this.report.id,
      decision: this.reviewForm.value.decision,
      remarks: this.reviewForm.value.remarks,
    };

    console.log('Review Saved:', payload);
    // this.reviewerService.submitReview(payload).subscribe({
    //   next: () => {
    //     alert('Review submitted successfully!');
    //     console.log('Review submitted successfully!');
    //     this.loadData();    
    //   },
    // });

    // TODO: call API → progress_report_reviews
    this.reportService.submitReview(payload).subscribe({
      next: () => {
        alert('Review submitted successfully!');
        console.log('Review submitted successfully!');
        this.loadData();    
      },
    });
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //  this.reportId = +params['reportId']; // convert to number
    // ✅ get reportId from query param
    this.reportId = +this.route.snapshot.queryParamMap.get('reportId')!;
    console.log('Received reportId:', this.reportId);

    this.reviewForm = this.fb.group({
      decision: ['', Validators.required],
      remarks: ['', Validators.required],
    });
    this.loadData();
  }

  loadData() {
    this.reviewerService.getReport(this.reportId).subscribe({
      next: (res) => {
        console.log('API Response:', res);

        this.report = res.report;
        this.scholarId = res.report.scholarId;
        this.progressStatus = res.report.progressStatus;
        this.reviewForm.patchValue({
          decision: this.progressStatus === 'PENDING' ? '' : this.progressStatus,
          remarks: res.previousRemarks || ''
          });
          
        
        this.nextActions = res.report.nextActions;
     

        this.attendance = res.attendancePercentage;
        this.attendanceremarks=res.attendanceremarks;
        this.programname = res.programname;
        this.fullName = res.fullName;
        this.enrolmentno = res.enrolmentno;

        if (this.progressStatus === 'APPROVED') {
        this.reviewForm.disable();
        }
        // console.log('Scholar ID from report:', this.scholarId);
        // console.log('Report:', this.report);
        // console.log('programName:', this.programname);
        // console.log('fullName:', this.fullName);
        // console.log('enrollmentNo:', this.enrolmentno);
        //this.documents = res.documents;

       // this.reviewerremarks = res.thereviewerRemark;

        //console.log('Reviewer Remarks:', this.reviewerremarks);
        //this.remarkThreads = this.reviewerremarks.filter((remark: any) => remark.parentRemarkId === null)  ;
       // this.remarkThreads = this.remarkService.buildRemarkTree(this.reviewerremarks);
       // console.log('Remark Threads:', this.remarkThreads);


        // Calculate eligibility
        // this.eligible = this.attendance?.percentage >= 75;
      },
      error: () => {
        console.error('Failed to load report');
      },
    });
  }
  
}
