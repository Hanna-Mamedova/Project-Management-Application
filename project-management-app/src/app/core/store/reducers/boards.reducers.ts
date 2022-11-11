import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions/boards.actions';
import { BoardsStateInterface } from '../state.models';

export const initialBoardsState: BoardsStateInterface = {
  boards: [],
};

export const boardsReducers = createReducer(
  initialBoardsState,
  on(Actions.getBoardsSuccess,
    (state, action): BoardsStateInterface => ({
      ...state,
      boards: action.boards,
    })),

  on(Actions.getBoardsFailure,
    (state, action): BoardsStateInterface => ({
      ...state,
      error: action.error,
    })),

  on(Actions.addBoardFormSubmitted,
    (state, action): BoardsStateInterface => ({
      ...state,
      boards: [...state.boards, action.boardItem],
    })),

  on(Actions.editBoardFormSubmitted,
    (state, action): BoardsStateInterface => {
      const boardIndex = state.boards.findIndex((board) => board.id === action.boardItem.id);
      const updatedBoards = [...state.boards];
      updatedBoards[boardIndex] = action.boardItem;

      return {
        ...state,
        boards: updatedBoards,
      };
    }),

  on(Actions.deleteBoardInitiated,
    (state, action): BoardsStateInterface => {
      const boardIndex = state.boards.findIndex((board) => board.id === action.boardId);
      const updatedBoards = [...state.boards];
      updatedBoards.splice(boardIndex, 1);

      return {
        ...state,
        boards: updatedBoards,
      };
    },
  ),
);
