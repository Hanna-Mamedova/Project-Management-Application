import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.actions';
import { catchError, map, mergeMap, of, switchMap, filter } from 'rxjs';
import { BoardRequestService } from '../../services/boards/board-request.service';

// @Injectable()
// export class ItemsEffects {
//   getBoardById$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(BoardsActions.getBoard),
//       mergeMap(() => {
//         return
//       }),
//     ),
//   );

//   constructor(
//     private actions$: Actions,
//     private boardRequestService: BoardRequestService,
//   ) {}
// }
