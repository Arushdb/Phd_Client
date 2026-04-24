import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ]
})
export class ResetPasswordComponent implements OnInit {
  private base = environment.apiBaseUrl;

  token: string = '';
  password: string = '';
  confirmPassword: string = '';

  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!this.token) {
      this.errorMessage = 'Invalid reset link';
    }
  }

  reset(): void {

    this.errorMessage = '';
    this.successMessage = '';

    // 🔐 validation
    if (!this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;

    this.http.post(
      `${this.base}/auth/reset-password`,
      {
        token: this.token,
        password: this.password
      }
    ).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Password updated successfully';

        // 🔁 redirect after 2 sec
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.errorMessage = 'Invalid or expired token';
      }
    });
  }
}