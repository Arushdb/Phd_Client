import { Component, Input, OnInit } from '@angular/core';
import { RemarkService } from '../../services/remark.service';
import { Remark } from '../../models/Remark';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { RemarkRefreshService } from '../../services/remark-refresh.service';
import { ScholarService } from '../../services/scholar.service';
import { MessageService } from '../../services/message.service';

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
    private refreshService: RemarkRefreshService,
    private scholarservice: ScholarService,
    private messageService: MessageService
   
  ) {}

  ngOnInit(): void {
    console.log('currentRole in RemarkThreadComponent:', this.currentRole);
    if (this.currentRole === 'ROLE_SCHOLAR') {
      console.log('Current role is SCHOLAR, skipping remark loading.');
      this.getScholarRemarks();   // 🔥 auto refresh
      return;
    }else{
       this.loadThreads();
    }
     if (this.currentRole === 'ROLE_SCHOLAR') {
      console.log('Current role is SCHOLAR, skipping remark loading.');
      this.refreshService.refresh$.subscribe(() => {
        this.getScholarRemarks();   // 🔥 auto refresh
      });
      return;
    }else{
       this.refreshService.refresh$.subscribe(() => {
        this.loadThreads();   // 🔥 auto refresh
      });
    }
     
      
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

  getScholarRemarks() {
  if (!this.reportId) {
    console.error('Report ID is null. Cannot fetch remarks.');
    return;
  }   
  this.scholarservice.getScholarRemarks(this.reportId).subscribe({
    next: (res:any) => {
      console.log('Scholar remarks response:', res);  
      this.threads = this.remarkService.buildRemarkTree(res);  
  },error: (err:any) => {
    this.messageService.showError('Error fetching scholar remarks');
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