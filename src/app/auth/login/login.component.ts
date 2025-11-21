// src/app/auth/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error: string | null = null;
  loginForm!:FormGroup ;

  

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
      
  }


  ngOnInit(): void {
     this.auth.logout();  // clear any existing session
    this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }

  login(): void {
     
    this.error = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const { username, password } = this.loginForm.value;

    // Replace this with real API call
    // For demo: create a dummy user
    const demoUser: User = {
      id: 'u1',
      name: username,
      roles: ['SCHOLAR']  // example role
    };

    try {
      this.auth.loginAs(demoUser);
      // Navigate to a route where menu bar appears but no automatic dashboard
      //this.router.navigate(['/']);  
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err?.message || 'Login failed';
    } finally {
      this.loading = false;
    }
  }
}
