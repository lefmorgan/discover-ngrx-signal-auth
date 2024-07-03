import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthenticationApplication } from '../../services/authentication-application';

@Component({
  selector: 'app-login-with-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './login-with-form.component.html',
  styleUrl: './login-with-form.component.scss'
})
export class LoginWithFormComponent {
  private readonly application = inject(AuthenticationApplication)
  loginForm = inject(FormBuilder).group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  get email(): FormControl {
    return this.loginForm.controls.email
  }

  get password(): FormControl {
    return this.loginForm.controls.password
  }

  get isValid(): Boolean {
    return this.loginForm.valid
  }

  save(): void {
    if(this.loginForm.value.email && this.loginForm.value.password)
    this.application.login(this.loginForm.value.email, this.loginForm.value.password)
  }

  updateErrorMessage() {

  }

  errorMessage() {

  }
}
