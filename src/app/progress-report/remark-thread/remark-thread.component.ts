import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-remark-thread',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './remark-thread.component.html'
})
export class RemarkThreadComponent {

  /** Parent remark + replies */
  @Input() threads: any[] = [];

  /** Current user role: SUPERVISOR | SCHOLAR | HOD | DEAN */
  @Input() currentRole!: string;

  replyForms: { [key: number]: FormGroup } = {};

  constructor(private fb: FormBuilder) {}

  getReplyForm(parentId: number): FormGroup {
    if (!this.replyForms[parentId]) {
      this.replyForms[parentId] = this.fb.group({
        replyText: ['']
      });
    }
    return this.replyForms[parentId];
  }

  submitReply(parentId: number): void {
    const form = this.getReplyForm(parentId);
    if (!form.value.replyText) return;

    const payload = {
      parentRemarkId: parentId,
      remarkText: form.value.replyText,
      role: this.currentRole
    };

    console.log('Reply Submitted:', payload);
    form.reset();

    // TODO: call API → reviewer_remarks (parent_remark_id)
  }
}
