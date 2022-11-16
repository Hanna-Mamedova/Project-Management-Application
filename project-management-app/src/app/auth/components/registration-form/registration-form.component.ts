import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Messages, TOAST_TIMEOUT } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  sub: Subscription;

  isSubmitted: boolean = false;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    private toastService: NotificationsService, 
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      login: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  updateFormValue(e: Event): void {
    e.preventDefault();
    this.form.setValue({
      name: this.form.value.name,
      login: this.form.value.login,
      password: this.form.value.password,
    });
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  showError(message: string): void {
    this.toastService.error(Messages.ERROR, message, { timeOut: TOAST_TIMEOUT });
  }

  register(e: Event): void {
    e.preventDefault();   
    if (this.form.valid) {  
      localStorage.setItem('userName', this.form.value.name);
      this.sub = this.authService.registerUser(this.form.value).subscribe({
        next: response => {
          this.showSuccess(Messages.USER_CREATED + response.login);
          this.form.reset();
          this.isSubmitted = false;
          this.router.navigate(['auth/login']);
        },
      });    
    } else {
      this.showError(Messages.INVALID_FORM_FIELDS);
      this.isSubmitted = true;
    }
  }

  get name(): AbstractControl {
    return this.form.controls['name'];
  }

  get email(): AbstractControl {
    return this.form.controls['login'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }
}
