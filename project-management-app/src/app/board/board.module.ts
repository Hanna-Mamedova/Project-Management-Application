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
import { EditTaskFormComponent } from './components/edit-task-form/edit-task-form.component';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { AddColumnFormComponent } from './components/add-column-form/add-column-form.component';
import { A11yModule } from '@angular/cdk/a11y';


@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    ColumnComponent,
    TitleInputComponent,
    AddTaskFormComponent,
    EditTaskFormComponent,
    AddColumnFormComponent,
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
    FlexModule,
    FlexLayoutModule,
    A11yModule,
  ],
  exports: [
    BoardComponent,
    TaskComponent,
    ColumnComponent,
    TitleInputComponent,
    AddTaskFormComponent,
  ],
})
export class BoardModule { }
