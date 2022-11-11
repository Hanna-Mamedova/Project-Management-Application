import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeBlockComponent } from './components/welcome-block/welcome-block.component';
import { AboutBlockComponent } from './components/about-block/about-block.component';


@NgModule({
  declarations: [
    WelcomePageComponent,
    WelcomeBlockComponent,
    AboutBlockComponent,
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
