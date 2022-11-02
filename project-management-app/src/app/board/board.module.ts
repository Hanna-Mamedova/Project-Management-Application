import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TaskComponent } from './task/task.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { MaterialModule } from '../core/material/material.module';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';


@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    CloseBtnComponent,
    EditBtnComponent,
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
