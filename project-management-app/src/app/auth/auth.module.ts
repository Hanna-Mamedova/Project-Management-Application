import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  exports: [
    LoginFormComponent,
    RegistrationFormComponent,
    LoginPageComponent,
  ],
})
export class AuthModule { }
