import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
})
export class CoreModule { }
