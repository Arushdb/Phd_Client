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
@Component({
  selector: 'app-review-progress-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RemarkThreadComponent, ReviewerRemarksComponent, ReviewerDocumentsComponent],
  templateUrl: './review-progress-report.component.html'
})
export class ReviewProgressReportComponent {

  /* ===== Inputs from parent / resolver / API ===== */
  @Input() scholar!: {
    name: string;
    enrollmentNo: string;
    program: string;
  };

  @Input() report!: {
    id: number;
    number: number;
    session: string;
    status: string;
  };

  @Input() attendance!: {
    totalDays: number;
    presentDays: number;
    percentage: number;
    remarks: string;
  };
   /** Documents attached to the progress report */
  documents = [
    { id: 118, name: 'Methodology.pdf' },
    { id: 119, name: 'Proposal.pdf' }
  ];

   /** Threaded reviewer remarks */
  remarkThreads = [
    {
      id: 101,
      authorRole: 'SUPERVISOR',
      date: '10 Jan 2026',
      text: 'Clarify sampling methodology.',
      documentName: 'Methodology.pdf',
      replies: [
        {
          authorRole: 'SCHOLAR',
          date: '12 Jan 2026',
          text: 'Updated section 3.2 with justification.'
        }
      ]
    }
  ];

  /* ===== Review Form ===== */
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      decision: ['', Validators.required],
      remarks: ['']
    });
  }

  /* ===== Eligibility rule ===== */
  get eligible(): boolean {
    return this.attendance?.percentage >= 75;
  }

  /* ===== Save Review ===== */
  save(): void {

    if (!this.eligible) {
      alert('Attendance below minimum eligibility. Review cannot be approved.');
      return;
    }

    if (this.reviewForm.invalid) {
      return;
    }

    const payload = {
      reportId: this.report.id,
      decision: this.reviewForm.value.decision,
      remarks: this.reviewForm.value.remarks
    };

    console.log('Review Saved:', payload);

    // TODO: call API → progress_report_reviews
  }
}
