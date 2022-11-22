import { createReducer, on } from '@ngrx/store';
import { Board } from '../../models/interfaces';
import * as Actions from '../actions/boards.actions';
import { initialBoardsState } from '../initial-states';
import { BoardsStateInterface } from '../state.models';

export const boardsReducers = createReducer(
  initialBoardsState,
  on(Actions.getBoardsSuccess,
    (state, action): BoardsStateInterface => ({
      ...state,
      boards: action.boards,
    })),

  on(Actions.addBoardSuccess,
    (state, action): BoardsStateInterface => ({
      ...state,
      boards: [action.boardItem, ...state.boards],
    })),

  on(Actions.editBoardSuccess,
    (state, action): BoardsStateInterface => {
      const updatedBoards = [...state.boards].reduce<Board[]>((prev, curr) => {
        if (curr.id === action.boardItem.id) {
          prev.push(action.boardItem);
        } else {
          prev.push(curr);
        }
        return prev;
      }, []);


      return {
        ...state,
        boards: updatedBoards,
      };
    }),

  on(Actions.deleteBoardSuccess,
    (state, action): BoardsStateInterface => {
      const updatedBoards = [...state.boards].filter((board) => board.id !== action.boardId);

      return {
        ...state,
        boards: updatedBoards,
      };
    },
  ),

);
