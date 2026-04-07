import { Component, Input, OnInit } from '@angular/core';
import { RemarkService } from '../../services/remark.service';
import { Remark } from '../../models/Remark';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { RemarkRefreshService } from '../../services/remark-refresh.service';

@Component({
  selector: 'app-remark-thread',
   standalone: true,
  templateUrl: './remark-thread.component.html',
    imports: [CommonModule, ReactiveFormsModule,FormsModule]
})
export class RemarkThreadComponent implements OnInit {

  @Input() reportId!: number;
  @Input() currentRole: string = '';

  threads: any[] = [];
  replyForms: { [key: number]: string } = {};
  newRemarkText: string = '';

  constructor(private remarkService: RemarkService,
    private refreshService: RemarkRefreshService
  ) {}

  ngOnInit(): void {
    this.loadThreads();
     this.refreshService.refresh$.subscribe(() => {
    this.loadThreads();   // 🔥 auto refresh
  });
  }

  // ===============================
  // Load threads
  // ===============================
  loadThreads() {
    this.remarkService.getRemarks(this.reportId).subscribe({
      next: (res: Remark[]) => {
        this.threads = this.remarkService.buildRemarkTree(res);
        console.log('Loaded threads:', this.threads);
      },
      error: (err) => {
        console.error('Error loading remarks:', err);
      }
    });
  }

 

  // ===============================
  // Start new thread
  // ===============================
  startNewThread() {

    if (!this.newRemarkText.trim()) return;

    const payload = {
      reviewContext: 'PROGRESS_REPORT',
      contextId: this.reportId,
      remarkText: this.newRemarkText,
      parentRemarkId: null
    };

    this.remarkService.addRemark(payload).subscribe(() => {
      this.newRemarkText = '';
      this.loadThreads();
    });
  }

  // ===============================
  // Reply to thread
  // ===============================
  reply(parentId: number) {

    const text = this.replyForms[parentId];
    if (!text?.trim()) return;

    const payload = {
      reviewContext: 'PROGRESS_REPORT',
      contextId: this.reportId,
      remarkText: text,
      parentRemarkId: parentId
    };

    this.remarkService.addRemark(payload).subscribe(() => {
      this.replyForms[parentId] = '';
      this.loadThreads();
    });
  }

}