import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { FormErrors } from 'src/app/core/environments/formErrorMsgs';
import { User } from 'src/app/core/models/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  sub: Subscription;

  isSubmitted: boolean = false;

  errors: typeof FormErrors = FormErrors;

  constructor(private auth: AuthService, private fb: FormBuilder, private toast: NotificationsService, private route: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      login: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  updateFormValue(e: Event): void {
    e.preventDefault();
    this.form.setValue({
      login: this.form.value.login,
      password: this.form.value.password,
    });
  }

  showSuccess(message: string): void {
    this.toast.success('Success', message, { timeOut: 3000 });
  }

  login(e: Event): void {
    e.preventDefault();
    if (this.form.valid) {
      this.sub = this.auth.login(this.form.value).subscribe({
        next: data => {
          const token: string = Object.values(data)[0];
          const user: User = this.auth.parseToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('userId', user.userId);
          this.auth.isLoggedIn$.next(!!localStorage.getItem('token'));
          this.showSuccess('Logged in!');
          this.form.reset();
          this.isSubmitted = false;
          this.route.navigate(['main']);
        },
      });  
    }
    this.isSubmitted = true;
  }

  get email(): AbstractControl {
    return this.form.controls['login'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }
}
