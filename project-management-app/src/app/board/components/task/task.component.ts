import { Component, Input } from '@angular/core';
import { Task } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { deleteTask } from 'src/app/core/store/actions/tasks.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';
import { NotificationsService } from 'angular2-notifications';
import { Messages, TOAST_TIMEOUT } from 'src/app/core/constants/constants';

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

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private toastService: NotificationsService,
  ) {}

  openEditTaskModal(): void {
    this.dialog.open(EditTaskFormComponent, {
      data: {
        targetTask: this.task,
        columnId: this.columnId,
      },
    });
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  deleteTask(): void {
    this.store.dispatch(deleteTask({ columnId: this.columnId, taskId: this.task.id! }));
    this.showSuccess(Messages.TASK_DELETED);
  }

}
