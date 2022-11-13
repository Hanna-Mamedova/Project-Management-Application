import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { BoardRequestService } from '../../services/boards/board-request.service';

@Injectable()
export class BoardsEffects {

  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.getBoards),
      switchMap(() => this.boardRequestService.getBoards().pipe(
        map((boards) =>
          BoardsActions.getBoardsSuccess({ boards: boards }),
        ),
        catchError((error) => of(BoardsActions.getBoardsFailure({ error: error }))),
      )),
    ); 
  },
  );

  addBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.addBoard),
      switchMap((action) => this.boardRequestService.createBoard(action.boardItem).pipe(
        map((board) =>
          BoardsActions.addBoardSuccess({ boardItem: board }),
        ),
        catchError((error) => of(BoardsActions.addBoardFailure({ error: error }))),
      ),
      ),
    ); 
  },
  );

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.editBoard),
      switchMap((action) =>
        this.boardRequestService.updateBoard(action.boardId, action.boardItem).pipe(
          map((board) =>
            BoardsActions.editBoardSuccess({ boardItem: board }),
          ),
          catchError((error) => of(BoardsActions.editBoardFailure({ error: error }))),
        ),
      ),
    ); 
  },
  );

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.deleteBoard),
      switchMap((action) => this.boardRequestService.deleteBoard(action.boardId)
        .pipe(
          map(() =>
            BoardsActions.deleteBoardSuccess({ boardId: action.boardId }),
          ),
          catchError((error) => of(BoardsActions.deleteBoardFailure({ error: error }))),
        ),
      ),
    ); 
  },
  );

  constructor(
    private actions$: Actions,
    private boardRequestService: BoardRequestService,
  ) { }
}
