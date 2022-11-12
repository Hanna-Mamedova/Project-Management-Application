import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { Board } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { BoardsStateInterface } from 'src/app/core/store/state.models';
import { deleteBoard } from './../../core/store/actions/boards.actions';

@Component({
  selector: 'app-delete-board',
  templateUrl: './delete-board.component.html',
  styleUrls: ['./delete-board.component.scss']
})
export class DeleteBoardComponent {

  constructor(
    private toast: NotificationsService,
    private store: Store<BoardsStateInterface>,

    @Inject(MAT_DIALOG_DATA) public data: {
      board: Board;
    },
  ) { }

  onConfirm(): void {
    this.store.dispatch(deleteBoard({ boardId: this.data.board.id! }));
    this.toast.success('Success', 'Board was deleted!', { timeOut: 3000 });
  }

}
