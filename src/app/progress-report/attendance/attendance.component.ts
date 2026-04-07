import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReviewerService } from '../../services/reviewer.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit {

  attendanceForm!: FormGroup;

  scholarSemesters: any[] = [];
  isEditMode = false;
  recordId: number | null = null;

  isSupervisor = false;

  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private reviewerService: ReviewerService
  ) {}

  ngOnInit(): void {

    // 🔐 Role Check
    //const role = localStorage.getItem('role');
    //this.isSupervisor = role === 'ROLE_SUPERVISOR';

    // if (!this.isSupervisor) {
    //   alert('Access denied');
    //   this.router.navigate(['/dashboard']);
    //   return;
    // }
    this.route.queryParamMap.subscribe(params => { this.scholarSemesters = params.get('scholarSemesters') ? JSON.parse(params.get('scholarSemesters') || '[]') : []; });
    const scholarSemesterId = this.route.snapshot.queryParamMap.get('scholarSemesterId');
    const semesterName = this.route.snapshot.queryParamMap.get('semesterName');
    const totalsessions = this.route.snapshot.queryParamMap.get('totalsessions');
    const attendedsessions = this.route.snapshot.queryParamMap.get('attendedsessions');
    const attendancePercentage = this.route.snapshot.queryParamMap.get('attendancePercentage');
    const attendanceremarks = this.route.snapshot.queryParamMap.get('attendanceremarks');
    const scholarId = this.route.snapshot.queryParamMap.get('scholarId');
    // 🧾 Form Init
    this.attendanceForm = this.fb.group({
      scholarSemesterId: ['', Validators.required],
      semesterName: ['', Validators.required],
      totalsessions: ['', [Validators.required, Validators.min(1)]],
      attendedsessions: ['', [Validators.required, Validators.min(0)]],
      attendancePercentage: [{ value: '', disabled: true }],
      attendanceremarks: [''],
      scholarid: ['']
      

    });

   // this.loadScholarSemesters();
    
  //   if (scholarSemesterId) {
  //     this.attendanceForm.patchValue({ scholarSemesterId: scholarSemesterId });
  //     //this.loadExisting(+scholarSemesterId);
  //     this.attendanceForm.patchValue({ semesterName: semesterName });
  //     this.attendanceForm.patchValue({ totalsessions: totalsessions });
  //     this.attendanceForm.patchValue({ attendedsessions: attendedsessions });
  //     this.attendanceForm.patchValue({ attendancePercentage: attendancePercentage });
  //     this.attendanceForm.patchValue({ attendanceremarks: attendanceremarks });
  //     if (  attendancePercentage) {
  //     this.isEditMode = true;
  //   }
  // }

  if (scholarSemesterId) {

  this.attendanceForm.patchValue({
    scholarSemesterId: scholarSemesterId,
    semesterName: semesterName,
    totalsessions: totalsessions,
    attendedsessions: attendedsessions,
    attendancePercentage: attendancePercentage,
    attendanceremarks: attendanceremarks,
    scholarid: scholarId
  });

  if (attendancePercentage !== null && attendancePercentage !== undefined
    && totalsessions !== null && totalsessions !== undefined
  ) {
    this.isEditMode = true;
  }
}

  this.setupAutoCalculation();    

    // 🔄 On dropdown change
    // this.attendanceForm.get('scholarSemesterId')?.valueChanges.subscribe(id => {
    //   if (id) {
    //     console.log("Selected Scholar Semester ID:", id);
    //     this.loadExisting(id);
    //   }
    // });
  }

  // 🔽 Load dropdown data
  // loadScholarSemesters() {
  //   this.http.get<any[]>(`${this.baseUrl}/scholar-semester`)
  //     .subscribe({
  //       next: res => this.scholarSemesters = res,
  //       error: err => console.error(err)
  //     });
  // }

  // 🔢 Auto calculate %
  setupAutoCalculation() {
    this.attendanceForm.valueChanges.subscribe(val => {

      const total = val.totalsessions;
      const attended = val.attendedsessions;
      console.log("total",total);
      console.log("attended",attended);


      if (total && attended >= 0 && attended <= total) {
        const percent = (attended * 100) / total;

        this.attendanceForm.patchValue(
          { attendancePercentage: percent.toFixed(2) },
          { emitEvent: false }
        );
      }
    });

  }

  // 🔍 Load existing attendance
  // loadExisting(scholarSemesterId: number) {

  //   this.http.get<any>(
  //     `${this.baseUrl}/attendance/by-scholar-semester/${scholarSemesterId}`
  //   ).subscribe({
  //     next: res => {
  //       if (res) {
  //         this.isEditMode = true;
  //         this.recordId = res.id;

  //         this.attendanceForm.patchValue({
  //           totalSessions: res.totalSessions,
  //           attendedSessions: res.attendedSessions,
  //           attendancePercentage: res.attendancePercentage,
  //           attendanceRemarks: res.attendanceRemarks,
  //           overallRemarks: res.overallRemarks
  //         });
  //       } else {
  //         this.resetFormFields();
  //       }
  //     },
  //     error: () => {
  //       this.resetFormFields();
  //     }
  //   });
  // }

  // 🔄 Reset fields (keep scholarSemesterId)
  resetFormFields() {
    this.isEditMode = false;
    this.recordId = null;

    this.attendanceForm.patchValue({
      totalSessions: '',
      attendedSessions: '',
      attendancePercentage: '',
      attendanceRemarks: '',
      overallRemarks: ''
    });
  }

  // 💾 Save / Update
  // onSubmit() {

  //   if (this.attendanceForm.invalid) return;

  //   const payload = this.attendanceForm.getRawValue();

  //   if (this.isEditMode && this.recordId) {

  //     this.http.put(`${this.baseUrl}/attendance/${this.recordId}`, payload)
  //       .subscribe({
  //         next: () => alert('Attendance updated successfully'),
  //         error: err => console.error(err)
  //       });

  //   } else {

  //     this.http.post(`${this.baseUrl}/attendance`, payload)
  //       .subscribe({
  //         next: () => {
  //           alert('Attendance saved successfully');
  //           this.attendanceForm.reset();
  //         },
  //         error: err => console.error(err)
  //       });
  //   }
  // }

  onSubmit() {  
    if (this.attendanceForm.invalid) return;
  

    const payload = this.attendanceForm.getRawValue();
    this.reviewerService.submitAttendance(payload).subscribe({
      next: () => {
        alert('Attendance saved successfully');
        this.router.navigate(['/reviewer-dashboard']);
      },
      error: err => console.error(err)
    }); 
    
    

}
}