import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBoard } from '../core/store/actions/boards.actions';
import { map } from 'rxjs';
import { selectBoard, selectColumns } from '../core/store/selectors/boards.selectors';
import { BoardStateInterface } from '../core/store/state.models';
import { Column } from '../core/models/interfaces';

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

  public dropGrid(event: CdkDragDrop<any[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

}
