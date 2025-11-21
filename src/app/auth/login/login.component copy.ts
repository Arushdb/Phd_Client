import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
//import { ApiService } from '../../services/api.service';   // update path if needed

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
currentYear = new Date().getFullYear();
  loading = false;
  error: string | null = null;
  loginForm!: FormGroup ;
  constructor(private fb: FormBuilder,  private router: Router,private api:ApiService) {}
  
  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = null;

    const { username, password } = this.loginForm.value;

    this.api.login(username!, password!).subscribe({
      next: (resp: any) => {
        localStorage.setItem('token', resp.token);
        this.router.navigate(['/scholar-registration']);
      },
      error: (err) => {
        this.error = err?.error || 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}
  



