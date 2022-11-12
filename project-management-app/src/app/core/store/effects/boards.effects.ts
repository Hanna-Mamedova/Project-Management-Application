import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { BoardRequestService } from '../../services/boards/board-request.service';

@Injectable()
export class BoardsEffects {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.getBoards),
      switchMap(() => this.boardRequestService.getBoards().pipe(
        map((boards) =>
          BoardsActions.getBoardsSuccess({ boards: boards }),
        ),
        catchError((error) => of(BoardsActions.getBoardsFailure({ error: error }))),
      )),
    ),
  );

  // deleteBoard$ = createEffect(() => {
  //   this.actions$.pipe(
  //     ofType(BoardsActions.deleteBoard),
  //     switchMap((action) => {
  //       this.boardRequestService.deleteBoard(action.boardId)
  //         .pipe(
  //           map(() => {
  //             BoardsActions.deleteBoardSuccess({ boardId: action.boardId });
  //           }),
  //         ),
  //         catchError((error) => of(BoardsActions.deleteBoardFailure({ error: error })));
  //     })
  //   );
  // }
  // );
  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.deleteBoard),
      switchMap((action) => this.boardRequestService.deleteBoard(action.boardId)
        .pipe(
          map(() =>
            BoardsActions.deleteBoardSuccess({ boardId: action.boardId }),
          ),
          catchError((error) => of(BoardsActions.deleteBoardFailure({ error: error }))),
        ),
      ),
    ),
  );


  constructor(
    private actions$: Actions,
    private boardRequestService: BoardRequestService,
  ) { }
}
