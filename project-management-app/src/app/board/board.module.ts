import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TaskComponent } from './components/task/task.component';
import { MaterialModule } from '../core/material/material.module';
import { ColumnComponent } from './components/column/column.component';
import { TitleInputComponent } from './components/title-input/title-input.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from '../core/store/effects/board.effects';
import { boardReducers } from '../core/store/reducers/board.reducers';
import { TranslateModule } from '@ngx-translate/core';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    ColumnComponent,
    TitleInputComponent,
    AddTaskFormComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    StoreModule.forFeature('board', boardReducers),
    EffectsModule.forFeature([BoardEffects]),
  ],
  exports: [
    BoardComponent,
    TaskComponent,
  ],
})
export class BoardModule { }
