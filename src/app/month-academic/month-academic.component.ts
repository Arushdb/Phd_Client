import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-month-academic',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './month-academic.component.html',
  styleUrl: './month-academic.component.css'
})
export class MonthAcademicComponent {
// Months (UI name + backend number)
constructor(private apiservice:ApiService,
  private router:Router,private messageService:MessageService) {}

  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];

  // Academic years (UI label + backend year)
  academicYears = [
    { label: '2023-24', value: 2023 },
    { label: '2024-25', value: 2024 },
    { label: '2025-26', value: 2025 },
    { label: '2026-27', value: 2026 },
    { label: '2027-28', value: 2027 }
  ];
  selectedYear: number | null = null;
  selectedMonth: number | null = null;

  submit() {
    const dto = {
      academicYear: this.selectedYear,
      admissionMonth: this.selectedMonth
    };
    console.log('DTO to backend:', dto);
    debugger
this.apiservice.createScholar(dto).subscribe({
      next: (res) => {
        this.messageService.success(res.message);
       setTimeout(() => {
  this.router.navigate(['/home']);   // or your target route
}, 2000); 
       
  },error: (err) => {
    this.messageService.error(err.error.message);
        console.error('Error from backend:', err);
      }
});
  }
} 
