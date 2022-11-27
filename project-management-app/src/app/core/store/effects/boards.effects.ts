import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.actions';
import { map, switchMap } from 'rxjs';
import { BoardRequestService } from '../../services/boards/board-request.service';

@Injectable()
export class BoardsEffects {

  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.getBoards),
      switchMap(() => this.boardRequestService.getBoards().pipe(
        map((boards) =>
          BoardsActions.getBoardsSuccess({ boards }),
        ),
      )),
    );
  });

  addBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.addBoard),
      switchMap((action) => this.boardRequestService.createBoard(action.boardItem).pipe(
        map((board) =>
          BoardsActions.addBoardSuccess({ boardItem: board }),
        ),
      )),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.editBoard, BoardsActions.editBoardTitle),
      switchMap((action) =>
        this.boardRequestService.updateBoard(action.boardId, action.boardItem).pipe(
          map((board) =>
            BoardsActions.editBoardSuccess({ boardItem: board }),
          ),
        ),
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.deleteBoard),
      switchMap((action) => this.boardRequestService.deleteBoard(action.boardId)
        .pipe(
          map(() =>
            BoardsActions.deleteBoardSuccess({ boardId: action.boardId }),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private boardRequestService: BoardRequestService,
  ) { }
}
