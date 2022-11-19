import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBoard } from '../core/store/actions/boards.actions';
import { map } from 'rxjs';
import { selectBoard, selectColumns } from '../core/store/selectors/boards.selectors';
import { BoardStateInterface } from '../core/store/state.models';
import { Column } from '../core/models/interfaces';
import { addColumn, sortColumns } from '../core/store/actions/columns.actions';
import { COLUMN_CREATED_TITLE, Messages, TOAST_TIMEOUT } from '../core/constants/constants';
import { NotificationsService } from 'angular2-notifications';

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
    private toastService: NotificationsService,
  ) { }

  ngOnInit(): void {
    console.log(this.columns$);

    this.store.dispatch(getBoard());
    this.showSuccess(Messages.BOARD_LOADED);
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  public dropGrid(event: CdkDragDrop<Column[] | null>): void {
    this.store.dispatch(sortColumns({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    }));
  }

  addColumn(): void {
    this.store.dispatch(addColumn({ column: { title: COLUMN_CREATED_TITLE } }));
    this.showSuccess(Messages.COLUMN_CREATED);
  }
}
