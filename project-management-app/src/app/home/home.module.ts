import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';


@NgModule({
  declarations: [
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports: [
    WelcomePageComponent,
  ],
})
export class HomeModule { }
