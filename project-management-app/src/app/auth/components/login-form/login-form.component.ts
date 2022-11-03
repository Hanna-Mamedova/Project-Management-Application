import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(private serv: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
