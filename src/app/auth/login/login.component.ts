// src/app/auth/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService, User } from '../../services/auth.service';

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
  reason: string | null = null;

  

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private apiservice: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      
  }


  ngOnInit(): void {
     
    this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  //  this.route.queryParams.subscribe(params => {
  //     this.reason = params['reason'];

  //     // Example handling
  //     if (this.reason === 'token-expired') {
  //       console.log('Session expired. Please login again.');
  //     }

  //     if (this.reason === 'idle-timeout') {
  //       console.log('Logged out due to inactivity.');
  //     }
  //   });

    this.reason = this.route.snapshot.queryParamMap.get('reason');

  }

  login(): void {
     
    this.error = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: (res) => { console.log(res); 
        this.loading = false;
        const user: User = {
        id: res.id,
        name: res.username,
        roles: res.roles
      };

      const token = res.accessToken;

      // persist
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('access_token', token);

      // update state
      this.auth['currentUserSubject'].next(user);

      // schedule expiry logout
  //     const expMs = this.auth.getTokenExpiration(token);
  //     const msUntilExpiry = expMs - Date.now();
  //     if (msUntilExpiry <= 0) {
  // // token already expired
  //     this.auth.logout('token-expired');
  //   } else {
  //     this.auth.scheduleAutoLogout(msUntilExpiry);
  //   }
     

      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.error = err?.message || 'Login failed';    
        this.loading = false;
      console.error('Login failed', err);
    }
  });
   
  }
}
