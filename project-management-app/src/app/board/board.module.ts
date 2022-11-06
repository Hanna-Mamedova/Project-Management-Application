import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TaskComponent } from './components/task/task.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { MaterialModule } from '../core/material/material.module';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { ColumnComponent } from './components/column/column.component';
import { TitleInputComponent } from './components/title-input/title-input.component';


@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    CloseBtnComponent,
    EditBtnComponent,
    ColumnComponent,
    TitleInputComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,
  ],
  exports: [
    BoardComponent,
    TaskComponent,
    CloseBtnComponent,
    EditBtnComponent,
  ],
})
export class BoardModule { }
