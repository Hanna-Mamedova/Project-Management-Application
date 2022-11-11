import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.actions';
import * as ColumnsActions from '../actions/columns.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { BoardRequestService } from '../../services/boards/board-request.service';
import { ActivatedRoute } from '@angular/router';
import { ColumnRequestService } from '../../services/columns/column-request.service';
import { Store } from '@ngrx/store';
import { selectBoardId } from '../selectors/boards.selectors';

@Injectable()
export class BoardEffects {
  getBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.getBoard),
      switchMap(() =>
        this.activatedRoute.queryParams.pipe(
          map((queryParams) => queryParams['id']),
          switchMap((id: string) => this.boardRequestService.getBoardById(id).pipe(
            map((board) =>
              BoardsActions.getBoardSuccess({ board: board }),
            ),
            catchError((error) => of(BoardsActions.getBoardFailure({ error: error }))),
          ),
          ),
        ),
      ),
    ),
  );

  addColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.addColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([action, id]) =>
        this.columnRequestService.createColumn(id, action.column).pipe(
          map((createdColumn) =>
            ColumnsActions.addColumnSuccess({ createdColumn: createdColumn }),
          ),
        ),
      ),
    ),
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.deleteColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([action, boardId]) => this.columnRequestService.deleteColumn(boardId, action.columnId).pipe(
        map(() =>
          ColumnsActions.deleteColumnSuccess({ columnId: action.columnId }),
        ),
      ),
      ),

    ),
  );

  constructor(
    private actions$: Actions,
    private boardRequestService: BoardRequestService,
    private columnRequestService: ColumnRequestService,
    private activatedRoute: ActivatedRoute,
    private store: Store,
  ) { }
}
