import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { deleteTask } from 'src/app/core/store/actions/tasks.actions';

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

  constructor(private store: Store) {}

  editTask(taskId: string): void {
    console.log('OPEN EDIT MODAL');
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(deleteTask({ columnId: this.columnId, taskId: taskId }));
  }

}
