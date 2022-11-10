import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.actions';
import { catchError, map, mergeMap, of, switchMap, filter } from 'rxjs';
import { BoardRequestService } from '../../services/boards/board-request.service';

@Injectable()
export class BoardsEffects {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.getBoards),
      switchMap(() => this.boardRequestService.getBoards().pipe(
        map((boards) =>
        BoardsActions.getBoardsSuccess({ boards: boards })
        ),
        catchError((error) => of(BoardsActions.getBoardsFailure({ error: error}))),
      )),
    ),
  );

  constructor(
    private actions$: Actions,
    private boardRequestService: BoardRequestService,
  ) {}
}
