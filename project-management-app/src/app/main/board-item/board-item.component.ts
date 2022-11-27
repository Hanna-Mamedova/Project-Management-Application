import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board, DialogData } from 'src/app/core/models/interfaces';
import { UpdateBoardComponent } from '../update-board/update-board.component';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { NotificationsService } from 'angular2-notifications';
import { Messages, MODAL_ANIMATION_TIMEOUT, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
import { Store } from '@ngrx/store';
import { deleteBoard } from 'src/app/core/store/actions/boards.actions';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {

  @Input() board: Board;

  @ViewChild('boardTitle') boardTitle: any;

  dialogParams: DialogData;

  constructor(
    public dialog: MatDialog,
    private translateService: TranslateService,
    private dialogService: DialogService,
    private toastService: NotificationsService,
    private store: Store,
  ) { }

  onEditClick(): void {
    this.dialog.open(UpdateBoardComponent, {
      data: { board: this.board },
    });
  }

  openConfirmModal(): void {
    this.translateService.get([
      'Dialog.delete-board.board-title',
      'Dialog.delete-board.board-delete-message',
      'Dialog.decline',
      'Dialog.confirm',
    ]).subscribe(translations => {

      this.dialogParams = {
        title: translations['Dialog.delete-board.board-title'],
        message: translations['Dialog.delete-board.board-delete-message'],
        decline: translations['Dialog.decline'],
        confirm: translations['Dialog.confirm'],
        action: () => this.deleteBoard(),
      };
    });

    this.dialogService.confirmDialog(MODAL_ANIMATION_TIMEOUT, MODAL_ANIMATION_TIMEOUT, this.dialogParams);
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  deleteBoard(): void {
    this.store.dispatch(deleteBoard({ boardId: this.board.id! }));
    this.showSuccess(Messages.BOARD_DELETED);
  }
}
