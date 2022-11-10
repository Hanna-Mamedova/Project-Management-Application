import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { deleteTask } from 'src/app/core/store/actions/tasks.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input()
    task: Task;

  constructor(private store: Store) {}

  ngOnInit(): void {
  }

  editTask(id: string): void {
    console.log('OPEN EDIT MODAL');

  }

  deleteTask(id: string): void {
    this.store.dispatch(deleteTask({ taskId: id }));
  }

}
