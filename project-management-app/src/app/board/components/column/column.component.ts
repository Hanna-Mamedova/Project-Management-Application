import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Column, Task } from 'src/app/core/models/interfaces';
import { Store } from '@ngrx/store';
import { deleteColumn } from 'src/app/core/store/actions/columns.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input()
    column: Column;

  @Input()
    columnIds: string[];

  tasks: Task[];

  constructor(private store: Store) {}

  ngOnInit() {
    this.tasks = this.column.tasks!;
  }

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  deleteColumn(id: string): void {
    this.store.dispatch(deleteColumn()) /// DELETECOMUMN
  }

  addTask(): void {
    console.log('OPEN MODAL');
  }

}
