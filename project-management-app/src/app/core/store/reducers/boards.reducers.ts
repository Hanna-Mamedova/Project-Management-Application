import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions/boards.actions';
import { BoardStateInterface } from '../state.models';

export const initialBoardState: BoardStateInterface = {
  columns: {
    columns: [],
  }
};

export const boardsReducers = createReducer(
  initialBoardState,
  on(Actions.getBoard,
    (state, action): BoardStateInterface => ({
      ...state,
      columns: {
        columns: action.board.columns!,
      },
    })),
)
