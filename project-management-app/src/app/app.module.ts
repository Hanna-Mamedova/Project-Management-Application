import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardModule } from './board/board.module';
import { MainModule } from './main/main.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { UrlInterceptor } from './core/interceptors/url.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BoardModule,
    MainModule,
    CoreModule,
    HomeModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor, 
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor, 
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
