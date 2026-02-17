import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.remarkForm = this.fb.group({
      documentId: [null],                // optional
      isPrivate: [false],
      remarkText: ['', Validators.required]
    });
  }

  submitRemark(): void {

    if (this.remarkForm.invalid) return;

    const payload = {
      review_context: 'PROGRESS_REPORT',
      context_id: this.reportId,
      reviewer_role: this.reviewerRole,
      document_id: this.remarkForm.value.documentId,
      is_private: this.remarkForm.value.isPrivate,
      remark_text: this.remarkForm.value.remarkText,
      parent_remark_id: null              // 👈 IMPORTANT
    };

    console.log('New Remark:', payload);

    // TODO: API → reviewer_remarks (insert parent remark)

    this.remarkForm.reset({ isPrivate: false });
  }
}
