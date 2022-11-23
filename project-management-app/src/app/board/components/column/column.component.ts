import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Column, DialogData, Task } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { deleteColumn } from 'src/app/core/store/actions/columns.actions';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskFormComponent } from '../add-task-form/add-task-form.component';
import { addTask, deleteTask, sortTasksInColumn, sortTasksWithinColumns } from 'src/app/core/store/actions/tasks.actions';
import { NotificationsService } from 'angular2-notifications';
import { Messages, MODAL_ANIMATION_TIMEOUT, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
import { DialogService } from 'src/app/core/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {

  @Input()
    column: Column;

  @Input()
    columnIds: string[] | null;

  tasks: Task[];

  dialogParams: DialogData;

  isEditMobileEnable: boolean = false;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private toastService: NotificationsService,
    private dialogService: DialogService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    if (this.column.tasks) {
      this.tasks = this.column.tasks;
    }
  }

  public drop(event: CdkDragDrop<Task[]>): void {

    if (event.previousContainer === event.container) {
      this.store.dispatch(sortTasksInColumn({ columnId: this.column.id!, previousIndex: event.previousIndex, currentIndex: event.currentIndex }));
    } else {
      this.store.dispatch(sortTasksWithinColumns({
        previousColumnId: event.previousContainer.id,
        currentColumnId: event.container.id,
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      }));

      const movedTask = event.previousContainer.data[event.previousIndex]!;
      const movedTaskId = movedTask.id!;
      const { title, description, userId } = movedTask;

      const addTaskRequest = {
        title,
        description,
        userId,
      };

      this.store.dispatch(deleteTask({ columnId: event.previousContainer.id, taskId: movedTaskId }));
      this.store.dispatch(addTask({ columnId: event.container.id, task: addTaskRequest }));
    }
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  openConfirmModal(columnId: string): void {
    this.translateService.get([
      'Dialog.delete-board-components.column-title',
      'Dialog.delete-board-components.column-delete-message',
      'Dialog.decline',
      'Dialog.confirm',
    ]).subscribe(translations => {

      this.dialogParams = {
        title: translations['Dialog.delete-board-components.column-title'],
        message: translations['Dialog.delete-board-components.column-delete-message'],
        decline: translations['Dialog.decline'],
        confirm: translations['Dialog.confirm'],
        action: () => this.deleteColumn(columnId),
      };
    });

    this.dialogService.confirmDialog(MODAL_ANIMATION_TIMEOUT, MODAL_ANIMATION_TIMEOUT, this.dialogParams);
  }

  deleteColumn(id: string): void {
    this.store.dispatch(deleteColumn({ columnId: id }));
    this.showSuccess(Messages.COLUMN_DELETED);
  }

  openAddTaskModal(): void {
    this.dialog.open(AddTaskFormComponent, {
      data: {
        columnId: this.column.id,
      },
    });
  }

  onEditClick(): void {
    this.isEditMobileEnable = true;
  }
}


