import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Signup } from 'src/app/core/models/interfaces';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  sub: Subscription;

  isSubmitted: boolean = false;

  constructor(private auth: AuthService, private fb: FormBuilder, private toast: NotificationsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      login: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
    this.toast.success('Success', message, { timeOut: 3000 });
  }

  showError(message: string): void {
    this.toast.error('Error', message, { timeOut: 3000 });
  }

  register(e: Event): void {
    e.preventDefault();
    if (this.form.valid) {
      this.sub = this.auth.registerUser(this.form.value).subscribe({
        next: response => {
          this.showSuccess(`User with login ${(response as Signup).login} was created!`);
          this.form.reset();
        },
        error: response => this.showError(response.error.message),
      });
    }
    this.isSubmitted = true;
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
