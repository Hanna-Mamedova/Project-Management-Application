import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  message: string;

  sub: Subscription;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.auth.message$.subscribe(data => this.message = data);
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

  register(): void {
    this.auth.registerUser(this.form.value);
  }
}
