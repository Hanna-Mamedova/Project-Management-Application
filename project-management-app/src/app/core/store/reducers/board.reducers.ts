import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/boards.actions';
import * as ColumnActions from '../actions/columns.actions';
import * as TaskActions from '../actions/tasks.actions';
import { BoardStateInterface } from '../state.models';
import { Task } from '../../models/interfaces';

export const initialBoardState: BoardStateInterface = {
  board: {
    id: '',
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
        id: state.board.id,
        title: state.board.title,
        description: state.board.description,
        columns: [...state.board.columns!, action.createdColumn],
      },
    }),
  ),

  on(ColumnActions.editColumnSuccess,
    (state, action): BoardStateInterface => {
      const columnIndex = state.board.columns!.findIndex(column => column.id === action.editedColumn.id);
      const updatedColumns = [...state.board.columns!];
      updatedColumns[columnIndex] = action.editedColumn;

      return {
        ...state,
        board: {
          id: state.board.id,
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
          id: state.board.id,
          title: state.board.title,
          description: state.board.description,
          columns: updatedColumns,
        },
      };
    },
  ),

  on(TaskActions.addTaskSuccess,
    (state, action): BoardStateInterface => {
      let updatedColumns = [...state.board.columns!];
      const targetColumnIndex = updatedColumns.findIndex(column => column.id === action.columnId);
      console.log('targetColumnIndex', targetColumnIndex);

      const newTask: Task = {
        id: action.createdTask.id,
        title: action.createdTask.title,
        order: action.createdTask.order,
        description: action.createdTask.description,
        userId: action.createdTask.userId,
        files: action.createdTask.files,
      };

      console.log('newTask', newTask);

      // ПОЧЕМУ ОШИБКА!!!!
      updatedColumns[targetColumnIndex].tasks?.push(newTask);

      console.log('updatedColumns', updatedColumns);


      return {
        ...state,
        board: {
          id: state.board.id,
          title: state.board.title,
          description: state.board.description,
          columns: updatedColumns,
        }
      }
    }
  ),


);
