import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Messages, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
import { UserRequestService } from 'src/app/core/services/users/user-request.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  sub: Subscription;

  isSubmitted: boolean = false;

  constructor(
    private userReqService: UserRequestService, 
    private fb: FormBuilder, 
    private toastService: NotificationsService, 
    private router: Router,
    private authService: AuthService) { }

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

  get name(): AbstractControl {
    return this.form.controls['name'];
  }

  get email(): AbstractControl {
    return this.form.controls['login'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }

  editUser(e: Event): void {
    e.preventDefault();
    const userId = localStorage.getItem('userId') as string;
    if (this.form.valid) {
      localStorage.setItem('userName', this.form.value.name);
      this.authService.userName$.next(this.form.value.name);
      this.userReqService.updateUser(userId, this.form.value).subscribe({
        next: response => this.showSuccess(Messages.LOGIN_EDITED + response.login),
      });
      this.form.reset();
      this.isSubmitted = false;
      this.router.navigate(['main']);
    } else {
      this.showError(Messages.INVALID_FORM_FIELDS);
      this.isSubmitted = true;
    }   
  }
}
