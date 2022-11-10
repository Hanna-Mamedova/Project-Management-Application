import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.actions';
import { catchError, map, mergeMap, of, switchMap, filter } from 'rxjs';
import { BoardRequestService } from '../../services/boards/board-request.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class BoardEffects {
  getBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.getBoard),
      mergeMap(() => {
        return this.activatedRoute.params.pipe(
          map((params) => params['id']),
          switchMap((id: string) => this.boardRequestService.getBoardById(id).pipe(
            map((board) =>
              BoardsActions.getBoardSuccess({ board: board }),
            ),
            catchError((error) => of(BoardsActions.getBoardFailure({ error: error }))),
          )
          ),
        )
      })
    ),
  );

  constructor(
    private actions$: Actions,
    private boardRequestService: BoardRequestService,
    private activatedRoute: ActivatedRoute,
  ) { }
}
