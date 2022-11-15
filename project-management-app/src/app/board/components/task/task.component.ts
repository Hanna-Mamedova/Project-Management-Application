import { Component, Input } from '@angular/core';
import { Task } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { deleteTask } from 'src/app/core/store/actions/tasks.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input()
    task: Task;

  @Input()
    columnId: string;

  constructor(
    private store: Store,
    public dialog: MatDialog,
  ) {}

  openEditTaskModal(): void {
    this.dialog.open(EditTaskFormComponent, {
      data: {
        targetTask: this.task,
        columnId: this.columnId,
      },
    });
  }

  deleteTask(): void {
    this.store.dispatch(deleteTask({ columnId: this.columnId, taskId: this.task.id! }));
  }

}
