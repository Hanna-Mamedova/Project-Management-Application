import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Column, Task } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { deleteColumn } from 'src/app/core/store/actions/columns.actions';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskFormComponent } from '../add-task-form/add-task-form.component';
import { addTask, deleteTask, sortTasksInColumn, sortTasksWithinColumns } from 'src/app/core/store/actions/tasks.actions';

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

  constructor(
    private store: Store,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.tasks = this.column.tasks!;
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

  deleteColumn(id: string): void {
    this.store.dispatch(deleteColumn({ columnId: id }));
  }

  openAddTaskModal(): void {
    this.dialog.open(AddTaskFormComponent, {
      data: {
        columnId: this.column.id,
      },
    });
  }
}


