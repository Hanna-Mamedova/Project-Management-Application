import { Component, Input } from '@angular/core';
import { DialogData, Task } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { deleteTask } from 'src/app/core/store/actions/tasks.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';
import { NotificationsService } from 'angular2-notifications';
import { Messages, MODAL_ANIMATION_TIMEOUT, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  showBtns: boolean = false;

  @Input()
    task: Task;

  @Input()
    columnId: string;

  dialogParams: DialogData;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private toastService: NotificationsService,
    private translateService: TranslateService,
    private dialogService: DialogService,
  ) {}

  openEditTaskModal(): void {
    this.dialog.open(EditTaskFormComponent, {
      data: {
        targetTask: this.task,
        columnId: this.columnId,
      },
    });
  }

  openConfirmModal(): void {
    this.translateService.get([
      'Dialog.delete-board-components.task-title',
      'Dialog.delete-board-components.task-delete-message',
      'Dialog.decline',
      'Dialog.confirm',
    ]).subscribe(translations => {

      this.dialogParams = {
        title: translations['Dialog.delete-board-components.task-title'],
        message: translations['Dialog.delete-board-components.task-delete-message'],
        decline: translations['Dialog.decline'],
        confirm: translations['Dialog.confirm'],
        action: () => this.deleteTask(),
      };
    });

    this.dialogService.confirmDialog(MODAL_ANIMATION_TIMEOUT, MODAL_ANIMATION_TIMEOUT, this.dialogParams);
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  deleteTask(): void {
    this.store.dispatch(deleteTask({ columnId: this.columnId, taskId: this.task.id! }));
    this.showSuccess(Messages.TASK_DELETED);
  }

}
