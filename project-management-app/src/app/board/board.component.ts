import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board, Column } from '../core/models/interfaces';
import { Store } from '@ngrx/store';
import { getBoard } from '../core/store/actions/boards.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board: Board = {
    id: '1',
    title: 'TITLE1',
    description: 'dsf',
    columns: [
      {
        id: '1',
        title: 'COLUMN1',
        order: 1,
        tasks: [
          {
            id: '1;',
            title: 'TASK1',
            order: 1,
            description: 'sfdj;sfd',
            userId: 'sdf;j;',
            boardId: 'af;jf',
            columnId: 'sd;fj;',
          },
          {
            id: '2;',
            title: 'TASK2',
            order: 2,
            description: 'sdfsff;sfd',
            userId: 'sd;',
            boardId: 'asdf',
            columnId: 'sdffj;',
          },
        ],
      },
      {
        id: '2',
        title: 'COLUMN2',
        order: 2,
        tasks: [
          {
            id: '3;',
            title: 'TASK3',
            order: 1,
            description: 'sfdj;sfd',
            userId: 'sdf;j;',
            boardId: 'af;jf',
            columnId: 'sd;fj;',
          },
          {
            id: '4',
            title: 'TASK4',
            order: 2,
            description: 'sdfsff;sfd',
            userId: 'sd;',
            boardId: 'asdf',
            columnId: 'sdffj;',
          },
        ],
      },
    ],
  };

  columns: Column[] = this.board.columns!;

  columnIds: string[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getBoard({ board: this.board }));
    this.columnIds = this.columns.map(column => column.id) as string[];
  }

  public dropGrid(event: CdkDragDrop<Column[]>): void {
    moveItemInArray(this.board.columns!, event.previousIndex, event.currentIndex);
  }

}
