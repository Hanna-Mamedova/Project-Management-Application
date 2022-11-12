import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeBlockComponent } from './components/welcome-block/welcome-block.component';
import { AboutBlockComponent } from './components/about-block/about-block.component';
import { RssBlockComponent } from './components/rss-block/rss-block.component';
import { TeamBlockComponent } from './components/team-block/team-block.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    WelcomePageComponent,
    WelcomeBlockComponent,
    AboutBlockComponent,
    RssBlockComponent,
    TeamBlockComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    SwiperModule,
  ],
  exports: [
    WelcomePageComponent,
  ],
})
export class HomeModule { }
