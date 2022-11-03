import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
  ],
  exports: [
    WelcomePageComponent,
  ],
})
export class HomeModule { }
