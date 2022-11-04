import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private auth: AuthService, private fb: FormBuilder, private toast: NotificationsService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
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
      name: this.form.value.name,
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

  register(): void {
    this.sub = this.auth.registerUser(this.form.value).subscribe({
      next: response => this.showSuccess(`User with login ${(response as Signup).login} was created!`),
      error: response => this.showError(response.error.message),
    });
  }
}
