import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/global-services/loader.service';
import { UserInfo } from 'src/app/models/user-info.model';
import { AuthService } from '../../auth.service';
import { SignInFormFields } from '../../models/sign-in-form.model';

const COMMON_VALIDATORS = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(15),
];

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm = this.initLoginForm();
  loginControls = this.loginForm.controls;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginInfo: UserInfo = {
      username: this.loginForm.controls.username.value ?? '',
      password: this.loginControls.password.value ?? '',
    };

    this.subscriptions.push(
      this.authService.login(loginInfo).subscribe({
        next: () => {
          this.router.navigate(['dashboard']);
        },
        error: () => {
          this.loginForm.setErrors({ invalidCredentials: 'اطلاعات نامعتبر!' });
        },
      })
    );
  }

  ctrlHasError(ctrl: FormControl) {
    return ctrl.touched && ctrl.errors;
  }

  formHasErrors() {
    return (
      this.loginControls.username.dirty &&
      this.loginControls.password.dirty &&
      this.loginForm.errors
    );
  }

  private initLoginForm() {
    return this.fb.group({
      [SignInFormFields.Username]: ['', [...COMMON_VALIDATORS]],
      [SignInFormFields.Password]: ['', [...COMMON_VALIDATORS]],
    });
  }

  get formFields() {
    return SignInFormFields;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
