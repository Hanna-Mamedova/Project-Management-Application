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
import { DeleteBoardComponent } from './delete-board/delete-board.component';


@NgModule({
  declarations: [
    MainComponent,
    CreateBoardComponent,
    BoardItemComponent,
    UpdateBoardComponent,
    ProfileFormComponent,
    DeleteBoardComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule { }
