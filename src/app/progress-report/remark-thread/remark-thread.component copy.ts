import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RemarkService } from '../../services/remark.service';

@Component({
  selector: 'app-remark-thread111',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './remark-thread.component.html'
})
export class RemarkThreadComponent {

  /** Parent remark + replies */
  @Input() threads: any[] = [];
  @Input() contextId!: number;


  /** Current user role: SUPERVISOR | SCHOLAR | HOD | DEAN */
  @Input() currentRole!: string;

  replyForms: { [key: number]: FormGroup } = {};

  constructor(private fb: FormBuilder, private remarkService: RemarkService) {}

  getReplyForm(parentId: number): FormGroup {
    if (!this.replyForms[parentId]) {
      this.replyForms[parentId] = this.fb.group({
        replyText: ['']
      });
    }
    return this.replyForms[parentId];
  }

  submitReply(parentId: number): void {
    console.log('Submitting reply to remark ID:', parentId);
    const form = this.getReplyForm(parentId);
    if (!form.value.replyText) return;

    const payload = {
      parentRemarkId: parentId,
      remarkText: form.value.replyText,
      role: this.currentRole,
      contextId: this.contextId,
     
      // TODO: pass actual context (e.g. reportId)
    };

    console.log('Reply Submitted:', payload);
    form.reset();

    // TODO: call API → reviewer_remarks (parent_remark_id)
this.remarkService.submitRemarkReply(payload).subscribe({
  next: (res:any) => {
    console.log('Reply submission response:', res);

  },
  error: (err:any) => {
    console.error('Error submitting reply:', err);
  }

});
  }
  ngOnInit() {
    console.log('Initial Remark Threads:', this.threads);
  }

  
}
