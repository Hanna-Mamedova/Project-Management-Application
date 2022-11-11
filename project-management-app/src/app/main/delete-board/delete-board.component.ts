import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { Subscription, switchMap } from 'rxjs';
import { BoardRequestService } from './../../core/services/boards/board-request.service';
import { Board } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-delete-board',
  templateUrl: './delete-board.component.html',
  styleUrls: ['./delete-board.component.scss']
})
export class DeleteBoardComponent implements OnDestroy {
  sub: Subscription;

  constructor(public dialogRef: MatDialogRef<DeleteBoardComponent>,
    private toast: NotificationsService,
    private boardRequestService: BoardRequestService,

    @Inject(MAT_DIALOG_DATA) public data: {
      board: Board;
    },
  ) { }


  onConfirm(): void {
    this.sub = this.boardRequestService.deleteBoard(this.data.board.id)
      .pipe(switchMap(() => this.boardRequestService.getBoards()))
      .subscribe(() => { });

    this.toast.success('Success', 'Board was deleted!', { timeOut: 3000 });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
