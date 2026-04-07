import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RemarkService } from '../../services/remark.service';
import { RemarkRefreshService } from '../../services/remark-refresh.service';

@Component({
  selector: 'app-reviewer-remarks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reviewer-remarks.component.html'
})
export class ReviewerRemarksComponent {

  /* ===== Inputs ===== */
  @Input() reportId!: number;
  @Input() reviewerRole!: string;        // SUPERVISOR / HOD / DEAN / CO_SUPERVISOR
  @Input() documents: any[] = [];         // documents attached to report

  remarkForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private remarkService: RemarkService,
   private refreshService: RemarkRefreshService) {
    this.remarkForm = this.fb.group({
      documentId: [null],                // optional
      isPrivate: [false],
      remarkText: ['', Validators.required]
    });
  }

  submitRemark(): void {

    if (this.remarkForm.invalid) return;

    const payload = {
      //reportId: this.reportId,
      reviewContext: 'PROGRESS_REPORT',
      contextId: this.reportId,
      reviewerRole: this.reviewerRole,
      documentId: this.remarkForm.value.documentId,
      isPrivate: this.remarkForm.value.isPrivate,
      remarkText: this.remarkForm.value.remarkText,
      parentRemarkId: null              // 👈 IMPORTANT
    };

    console.log('New Remark:', payload);

    // TODO: API → reviewer_remarks (insert parent remark)
    this.remarkService.addRemark(payload).subscribe({
      next: (res) => {
        console.log('Remark added successfully:', res);
        this.refreshService.triggerRefresh(); 
      }
    }); 

    this.remarkForm.reset({ isPrivate: false });
  }

  
}
