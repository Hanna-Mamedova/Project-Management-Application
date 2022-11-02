import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
  ],
  exports: [
    BoardComponent,
  ],
})
export class BoardModule { }
