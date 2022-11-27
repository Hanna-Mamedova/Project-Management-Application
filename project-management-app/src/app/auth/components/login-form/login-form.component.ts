import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { Messages, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
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

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    private toastService: NotificationsService, 
    private router: Router) {}

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
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  login(e: Event): void {
    e.preventDefault();
    if (this.form.valid) {
      this.sub = this.authService.login(this.form.value).subscribe({
        next: data => {
          const token: string = Object.values(data)[0];
          this.authService.saveUserAuthInfo(token);
          this.showSuccess(Messages.LOGGED_IN);
          this.form.reset();
          this.isSubmitted = false;
          this.router.navigate(['main']);
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
