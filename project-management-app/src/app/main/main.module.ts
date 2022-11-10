import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CoreModule } from '../core/core.module';
import { CreateBoardComponent } from './create-board/create-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardItemComponent } from './board-item/board-item.component';
import { UpdateBoardComponent } from './update-board/update-board.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from '../core/store/effects/boards.effects';
import { boardsReducers } from '../core/store/reducers/boards.reducers';


@NgModule({
  declarations: [
    MainComponent,
    CreateBoardComponent,
    BoardItemComponent,
    UpdateBoardComponent,
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    TranslateModule,
    StoreModule.forFeature('boards', boardsReducers),
    EffectsModule.forFeature([BoardsEffects]),
  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule { }
