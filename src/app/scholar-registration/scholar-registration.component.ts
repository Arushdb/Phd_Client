import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-scholar-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './scholar-registration.component.html',
  styleUrls: ['./scholar-registration.component.css']
})
export class ScholarRegistrationComponent implements  OnInit {

  // UI State Signals
  showRegistrationTab = signal(true);
  errorMessage = signal<string | null>(null);
  activeSemester = signal<string | null>(null);
  semesters:string[] = [];
   isRegistrationDateAvailable = false;
  previousSemesterApproved = false;
  isMaxPhdPeriodExceeded = false;
  user = localStorage.getItem("currentUser");

  registrationForm!: FormGroup;
  scholarid: string[] = [];

  constructor(private fb: FormBuilder,private apiservice:ApiService) {
  
  }
  ngOnInit(): void {

    const username = this.user ? JSON.parse(this.user).name : null;
    console.log('Logged in user:', username);   
      this.registrationForm = this.fb.group({
      semesterId: ['', Validators.required],  
      semester: ['', Validators.required],
      scholarid: ['', Validators.required]
    });
    this.apiservice.getActiveSemester().subscribe({
     next:(res)=>{
      console.log('API Response for Active Semester:', res);

     if (!res.success || !res.data) {
      this.errorMessage.set(res.message || 'No active semester');
      return;
    }

  this.isRegistrationDateAvailable= true;
      const sem = res.data;
      console.log('Active Semester Data:', sem);
     
     this.registrationForm.patchValue({
      semester: sem.semester,
      scholarid: sem.scholarid
,
      semesterId: sem.semesterId

    });

      console.log('Available Semesters:', this.registrationForm);
      
    
  },
  error:(err:HttpErrorResponse)=>{
    console.error('Error fetching active semester:', err);

    this.errorMessage.set(err.error?.message||'Server error occurred while fetching active semester'); 
  }
  
  });

    

   
  }

  f() { return this.registrationForm.controls; }


  openRegistrationTab() {
    this.errorMessage.set(null);

    if (!this.isRegistrationDateAvailable) {
      this.errorMessage.set(
        'There is no semester available for registration'
      );
      return;
    }


    this.activeSemester.set(this.registrationForm.value.semester);

   

  }

 
  registerSemester() {
    this.errorMessage.set(null);

  
    // SUCCESS
  
    console.log('Registration Data:', this.registrationForm.value);

    this.apiservice.RegisterSemester(this.registrationForm)
      .subscribe({
      next:(res)=>{
          alert('Scholar registered successfully for the semester');
        console.log('API Response for Registration:', res); 
  }});

  }
}
