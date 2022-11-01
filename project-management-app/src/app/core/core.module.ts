import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
})
export class CoreModule { }
