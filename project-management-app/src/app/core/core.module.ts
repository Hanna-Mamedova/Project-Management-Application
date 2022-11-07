import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    LanguageSwitcherComponent,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    MaterialModule,
    LanguageSwitcherComponent,
  ],
})
export class CoreModule { }
