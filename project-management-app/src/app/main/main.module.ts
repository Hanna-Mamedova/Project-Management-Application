import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CoreModule } from '../core/core.module';
import { CreateBoardComponent } from './create-board/create-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardItemComponent } from './board-item/board-item.component';


@NgModule({
  declarations: [
    MainComponent,
    CreateBoardComponent,
    BoardItemComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule { }
