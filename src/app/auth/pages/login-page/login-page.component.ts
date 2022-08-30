import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignInFormFields } from '../../models/sign-in-form.model';

const COMMON_VALIDATORS = [
  Validators.required,
  Validators.min(3),
  Validators.max(10),
];

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm = this.initLoginForm();
  loginControls = this.loginForm.controls;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {}

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
      [SignInFormFields.Username]: ['', { validators: [...COMMON_VALIDATORS] }],
      [SignInFormFields.Password]: [
        '',
        {
          validators: [
            ...COMMON_VALIDATORS,
            Validators.pattern(/^[A-Za-z][A-Za-z0-9]*$/),
          ],
        },
      ],
    });
  }

  get formFields() {
    return SignInFormFields;
  }
}
