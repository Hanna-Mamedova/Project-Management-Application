import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBoard } from '../core/store/actions/boards.actions';
import { map } from 'rxjs';
import { selectBoard, selectColumns } from '../core/store/selectors/boards.selectors';
import { BoardStateInterface } from '../core/store/state.models';
import { Column } from '../core/models/interfaces';
import { addColumn, columnSorted } from '../core/store/actions/columns.actions';
import { Messages } from '../core/constants/constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  board$ = this.store.select(selectBoard);

  columns$ = this.store.select(selectColumns);

  columnIds$ = this.columns$.pipe(map((columns) => columns.map((column: Column) => column.id!)));

  constructor(
    private store: Store<BoardStateInterface>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getBoard());
  }

  public dropGrid(event: CdkDragDrop<Column[] | null>): void {
    this.store.dispatch(columnSorted({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    }));
  }

  addColumn(): void {
    this.store.dispatch(addColumn({ column: { title: Messages.COLUMN_CREATED_TITLE } }));
  }
}
