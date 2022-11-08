import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ProfileMenuComponent } from './components/header/menu/profile-menu.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './components/header/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    LanguageSwitcherComponent,
    ProfileMenuComponent,
    DialogComponent,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    LanguageSwitcherComponent,
  ],
})
export class CoreModule { }
