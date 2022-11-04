import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  sub: Subscription;

  constructor(private auth: AuthService, private fb: FormBuilder, private toast: NotificationsService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateFormValue(e: Event): void {
    e.preventDefault();
    this.form.setValue({
      login: this.form.value.login,
      password: this.form.value.password,
    });
    this.form.reset();
  }

  showSuccess(message: string): void {
    this.toast.success('Success', message, { timeOut: 3000 });
  }

  showError(message: string): void {
    this.toast.error('Error', message, { timeOut: 3000 });
  }

  login(): void {
    this.sub = this.auth.login(this.form.value).subscribe({
      next: data => {
        sessionStorage.setItem('token', JSON.stringify(data));
        this.showSuccess('Logged in!');
      },
      error: data => this.showError(data.error.message),
    });
  }
}
