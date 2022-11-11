import { createReducer, on } from '@ngrx/store';
import * as ColumnActions from '../actions/columns.actions';
import * as BoardActions from '../actions/boards.actions';
import { BoardStateInterface } from '../state.models';

export const initialBoardState: BoardStateInterface = {
  board: {
    title: '',
    description: '',
    columns: [],
  },
};

export const boardReducers = createReducer(
  initialBoardState,
  on(BoardActions.getBoardSuccess,
    (state, action): BoardStateInterface => ({
      ...state,
      board: action.board,
    })),
  on(BoardActions.getBoardFailure,
    (state, action): BoardStateInterface => ({
      ...state,
      error: action.error,
    })),

  on(ColumnActions.addColumnSuccess,
    (state, action): BoardStateInterface => ({
      ...state,
      board: {
        title: state.board.title,
        description: state.board.description,
        columns: [...state.board.columns!, action.createdColumn],
      },
    }),
  ),

  on(ColumnActions.editColumnSuccess,
    (state, action): BoardStateInterface => {
      const columnIndex = state.board.columns!.findIndex(column => column.id === action.column.id);
      const updatedColumns = [...state.board.columns!];
      updatedColumns[columnIndex] = action.column;

      return {
        ...state,
        board: {
          title: state.board.title,
          description: state.board.description,
          columns: updatedColumns,
        },
      };
    },
  ),

  on(ColumnActions.deleteColumn,
    (state, action): BoardStateInterface => {
      const columnIndex = state.board.columns!.findIndex(column => column.id === action.columnId);
      const updatedColumns = [...state.board.columns!];
      updatedColumns.splice(columnIndex, 1);

      return {
        ...state,
        board: {
          title: state.board.title,
          description: state.board.description,
          columns: updatedColumns,
        },
      };
    },
  ),
);
