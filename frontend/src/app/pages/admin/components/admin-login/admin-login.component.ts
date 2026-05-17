import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin-workspace']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.updateFormState();

    this.authService.login(this.loginForm.value.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.updateFormState();
        this.router.navigate(['/admin-workspace']);
      },
      error: (err) => {
        this.isLoading = false;
        this.updateFormState();
        this.errorMessage =
          err?.error?.message || 'Authentication failed. Please check your password.';
        console.error('Login error:', err);
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get passwordFieldType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  private updateFormState(): void {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl) {
      if (this.isLoading) {
        passwordControl.disable();
      } else {
        passwordControl.enable();
      }
    }
  }
}
