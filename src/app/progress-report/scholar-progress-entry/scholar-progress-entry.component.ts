import { Component, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ScholarDocumentsComponent } from '../scholar-documents/scholar-documents.component';
import { ActivatedRoute } from '@angular/router';
import { Scholar } from '../../models/scholar';
import { ScholarService } from '../../services/scholar.service';
import { MessageService } from '../../services/message.service';
import { RemarkService } from '../../services/remark.service';
import { RemarkThreadComponent } from '../remark-thread/remark-thread.component';
import { AuthService } from '../../services/auth.service';
import { ProgressWorkComponent } from '../progress-work/progress-work.component';
import { PublicationsComponent } from '../publications/publications.component';
import { ConferencesComponent } from '../conferences/conferences.component';
import { VisitsComponent } from '../visits/visits.component';
import { AchievementsComponent } from '../achievements/achievements.component';
import { ProgressWork } from '../../interfaces/progress-work';
import { debounceTime, Subject } from 'rxjs';
import { ProgressReportService } from '../../services/progress-report.service';
import { ProgressWorkService } from '../../services/progress-work.service';
@Component({
  selector: 'app-scholar-progress-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScholarDocumentsComponent,
    RemarkThreadComponent,
    ProgressWorkComponent,
    PublicationsComponent,
    ConferencesComponent,
    VisitsComponent,
    AchievementsComponent,
  ],
  templateUrl: './scholar-progress-entry.component.html',
})
export class ScholarProgressEntryComponent {
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  progressForm: FormGroup;
  progressStatus: string = '';
  progressworkList: ProgressWork[] = [];
  originalProgressWorkList: ProgressWork[] = [];
  private savePWSubject = new Subject<ProgressWork[]>();

  // 🔹 Semester info (from API / route resolver)
  semesterInfo = {
    semesterName: '',
    semesterRegistrationId: '',
    periodStart: '',
    periodEnd: '',
  };
  scholar: Scholar | null = null;
  reportId!: number;
  remarkThreads: any[] = [];
  currentRole: string = ''; // This can be dynamically set based on the logged-in user's role

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private scholarservice: ScholarService,
    private messageService: MessageService,
    private remarkService: RemarkService,
    private authService: AuthService,
    private progressWorkService: ProgressWorkService,
  ) {
    this.progressForm = this.fb.group({
      researchWork: ['', [Validators.required, Validators.maxLength(350)]],
      conference: [''],
      researchPaper: [''],
      tours: [''],
      noDayJob: [false],
      summary: ['', Validators.maxLength(250)],
    });
  }

  ngOnInit() {
    this.semesterInfo.semesterName = this.route.snapshot.paramMap.get(
      'semester',
    )
      ? `${this.route.snapshot.paramMap.get('semester')}`
      : '';
    this.semesterInfo.semesterRegistrationId =
      this.route.snapshot.queryParamMap.get('semesterid')
        ? `${this.route.snapshot.queryParamMap.get('semesterid')}`
        : '';

    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentRole = user.roles[0]; // Assuming single role, adjust if multiple roles are possible
        console.log('Current user role:', this.currentRole);
      }
    });
    this.scholarservice
      .getProgressReport(Number(this.semesterInfo.semesterRegistrationId))
      .subscribe({
        next: (res) => {
          console.log('Progress report response:', res);
          if (res.data) {
            this.progressForm.patchValue(res.data);
            this.reportId = res.data.id;
            console.log('Report ID set to:', this.reportId);
            this.progressStatus = res.data.progressStatus;
            this.getScholarRemarks();
            this.getprogressWork();
          } else {
            console.warn(
              'No progress report data found for semesterRegistrationId:',
              this.semesterInfo.semesterRegistrationId,
            );
          }
        },
        error: (err: any) => {
          this.messageService.showError('Error fetching progress report');
          console.error('Error fetching progress report:', err);
        },
      });
    this.savePWSubject.pipe(debounceTime(2000)).subscribe((data) => {
      this.saveProgressWork(data);
    });
  }
  getprogressWork() {
    if (!this.reportId) {
      console.error('Report ID is null. Cannot fetch progress work.');
      return;
    }
    if (this.reportId) {
      this.progressWorkService.getProgressWork(this.reportId).subscribe({
        next: (res) => {
          console.log('Progress work data:', res);
          this.progressworkList = [...res];
          // Deep copy
          this.originalProgressWorkList = JSON.parse(
            JSON.stringify(this.progressworkList),
          );
        
        },
        error: (err) => {
          this.messageService.showError('Error fetching progress work data');
          console.error('Error fetching progress work data:', err);
        },
      });
    }
  }

  hasProgressWorkChanged(): boolean {

  return JSON.stringify(this.progressworkList)
       !== JSON.stringify(this.originalProgressWorkList);
}

  saveProgressWork(data: ProgressWork[]): void {
    console.log('Saving progress work:', data, 'for report ID:', this.reportId);
    if (!this.reportId) {
      console.error('Report ID is null. Cannot save progress work.');
      return;
    }

    this.progressWorkService.saveProgressWork(data, this.reportId).subscribe({
      next: (response) => {
        this.getprogressWork();
        console.log('Saved successfully', response);
      },
      error: (err) => {
        console.error('Save failed', err);
      },
    });
  }

  onProgressChange(updatedProgress: ProgressWork[]) {
    this.progressworkList = [...updatedProgress];
    console.log('Progress list updated:', this.progressworkList);

    if (!this.isProgressListValid()) {
    return;
  }
   if (!this.hasProgressWorkChanged()) {
    console.log('No changes detected. Skipping save.');
    return;
  }
  this.savePWSubject.next(this.progressworkList);
    
  }

  isProgressListValid(): boolean {
    debugger;
    return this.progressworkList.every(
      (row) =>
        row.stageOfResearch?.trim() !== '' &&
        row.objectiveNo?.trim() !== '' &&
        row.completionPercentage >= 0 &&
        row.completionPercentage <= 100,
    );
  }
  submit(): void {
    console.log(
      'Submitting progress report with form values:',
      this.progressForm.value,
    );
    debugger;
    if (this.progressForm.invalid) return;

    const payload = {
      ...this.progressForm.value,
      semesterRegistrationId: Number(this.semesterInfo.semesterRegistrationId),
    };

    this.scholarservice.submitReport(payload).subscribe({
      next: (res) => {
        this.messageService.showSuccess(res.message);
        this.progressStatus = 'SUBMITTED';

        console.log('Progress Report Submitted:', payload);
        console.log('API Response:', res);

        // TODO: API call → INSERT INTO progress_report
      },
      error: (err) => {
        this.messageService.showError(
          'Error submitting progress report: ' +
            (err.error.message || 'Error submitting progress report'),
        );
        console.error('Error submitting progress report:', err);
      },
    });
  }
  saveDraft() {
    const payload = {
      ...this.progressForm.value,
      semesterRegistrationId: this.semesterInfo.semesterRegistrationId,
    };

    this.scholarservice.saveDraft(payload).subscribe({
      next: (res) => {
        this.messageService.showSuccess(res.message);
        this.progressStatus = 'DRAFT';
      },
      error: (err) => {
        this.messageService.showError('Error saving draft');
      },
    });
  }

  getScholarRemarks() {
    if (!this.reportId) {
      console.error('Report ID is null. Cannot fetch remarks.');
      return;
    }
    this.scholarservice.getScholarRemarks(this.reportId).subscribe({
      next: (res: any) => {
        console.log('Scholar remarks response:', res);
        this.remarkThreads = this.remarkService.buildRemarkTree(res);
      },
      error: (err: any) => {
        this.messageService.showError('Error fetching scholar remarks');
      },
    });
  }

  onRowDeleted(id: number) {

  this.progressWorkService
      .deleteProgressWork(id)
      .subscribe({
        next: () => {
          console.log('Row deleted successfully');
        },
        error: err => {
          console.error('Delete failed', err);
        }
      });
}
}
