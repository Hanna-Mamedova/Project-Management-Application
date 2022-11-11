import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TaskComponent } from './components/task/task.component';
import { MaterialModule } from '../core/material/material.module';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { ColumnComponent } from './components/column/column.component';
import { TitleInputComponent } from './components/title-input/title-input.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from '../core/store/effects/board.effects';
import { boardReducers } from '../core/store/reducers/board.reducers';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    EditBtnComponent,
    ColumnComponent,
    TitleInputComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,
    TranslateModule,
    StoreModule.forFeature('board', boardReducers),
    EffectsModule.forFeature([BoardEffects]),
  ],
  exports: [
    BoardComponent,
    TaskComponent,
    EditBtnComponent,
  ],
})
export class BoardModule { }
