import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule
  ]
})
export class ForgotPasswordComponent {

private base = environment.apiBaseUrl;
  email: string = '';
  loading: boolean = false;
  message: string = '';
  error: string = '';

  constructor(private http: HttpClient,private messageService: MessageService) {}

  submit(): void {

    this.message = '';
    this.error = '';

    // ✅ validation
    if (!this.email) {
      this.error = 'Email is required';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Enter a valid email';
      return;
    }

    this.loading = true;

    

    this.http.post(
      `${this.base}/auth/forgot-password?email=${this.email}`,
      {}
    ).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'If this email exists, a reset link has been sent.';
        this.messageService.showSuccess(this.message);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.error = 'Something went wrong. Please try again.';
        this.messageService.showError(this.error);
      }
    });
  }

  // 🔍 simple email validation
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}