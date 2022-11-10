import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions/boards.actions';
import { BoardsStateInterface } from '../state.models';

export const initialBoardsState: BoardsStateInterface = {
  boards: []
};

// export const boardsReducers = createReducer(
//   initialBoardsState,
//   on(Actions.getBoards,
//     (state, action): BoardsStateInterface => ({
//       ...state,
//       boards: action.boards,
//     })),
// )
