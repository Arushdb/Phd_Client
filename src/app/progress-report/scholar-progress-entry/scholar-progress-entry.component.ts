import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ScholarDocumentsComponent } from '../scholar-documents/scholar-documents.component';
import { ActivatedRoute } from '@angular/router';
import { Scholar } from '../../models/scholar';
import { ScholarService } from '../../services/scholar.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-scholar-progress-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , ScholarDocumentsComponent],
  templateUrl: './scholar-progress-entry.component.html'
})
export class ScholarProgressEntryComponent {
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  progressForm: FormGroup;
  progressStatus: string = 'DRAFT';
   // 🔹 Semester info (from API / route resolver)
  semesterInfo = {
    semesterName: 'July–December 2025',
    semesterRegistrationId: '202501',
    periodStart: '2025-07-01',
    periodEnd: '2025-12-31'
  };
  scholar:Scholar | null = null;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private scholarservice: ScholarService,private messageService: MessageService
  ) {
    this.progressForm = this.fb.group({
      researchWork: ['', [Validators.required, Validators.maxLength(350)]],
      conference: [''],
      researchPaper: [''],
      tours: [''],
      summary: ['', Validators.maxLength(250)],
      
      
    });
  }


  ngOnInit() {
  this.semesterInfo.semesterName = this.route.snapshot.paramMap.get('semester')?`${this.route.snapshot.paramMap.get('semester')}`:'';
  this.semesterInfo.semesterRegistrationId = this.route.snapshot.queryParamMap.get('semesterid')?`${this.route.snapshot.queryParamMap.get('semesterid')}`:'';
  
  
  this.scholarservice.getProgressReport(Number(this.semesterInfo.semesterRegistrationId)).subscribe({
    next: (res) => {
      console.log('Progress report response:', res);
      if (res.data) {
        this.progressForm.patchValue(res.data);
        this.progressStatus = res.data.progressStatus;
      }
  },error: (err) => {
    this.messageService.showError('Error fetching progress report');
  }    
  });   
}  

  submit(): void {

    console.log('Submitting progress report with form values:', this.progressForm.value);
    debugger;
    if (this.progressForm.invalid) return;

    const payload = {
      ...this.progressForm.value,
        semesterRegistrationId: Number(this.semesterInfo.semesterRegistrationId)
    };

this.scholarservice.submitReport(payload).subscribe({
  next: (res) => {
    this.messageService.showSuccess(res.message); 
    this.progressStatus = 'SUBMITTED';        

    console.log('Progress Report Submitted:', payload);

    // TODO: API call → INSERT INTO progress_report
  }
})
  }
  saveDraft() {
const payload = {
  ...this.progressForm.value,
  semesterRegistrationId: this.semesterInfo.semesterRegistrationId
};
    
  this.scholarservice.saveDraft(payload)
    .subscribe({
      next: (res) => {
       
        this.messageService.showSuccess(res.message);
        this.progressStatus = 'DRAFT';
      },
      error: (err) => {
        this.messageService.showError('Error saving draft');
       
      }
    });

}

}
