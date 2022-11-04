import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TranslateModule } from "@ngx-translate/core";



@NgModule({
  declarations: [
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
  ],
  exports: [
    WelcomePageComponent,
  ],
})
export class HomeModule { }
