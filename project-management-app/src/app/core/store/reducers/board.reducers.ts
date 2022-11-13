import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/boards.actions';
import * as ColumnActions from '../actions/columns.actions';
import * as TaskActions from '../actions/tasks.actions';
import { BoardStateInterface } from '../state.models';
import { Task, Column } from '../../models/interfaces';

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
      const newTask: Task = {
        id: action.createdTask.id,
        title: action.createdTask.title,
        order: action.createdTask.order,
        description: action.createdTask.description,
        userId: action.createdTask.userId,
        files: action.createdTask.files,
      };

      return {
        ...state,
        board: {
          id: state.board.id,
          title: state.board.title,
          description: state.board.description,
          columns: state.board.columns!.map((column: Column) => {
            return column.id !== action.columnId ? column : {
              ...column,
              tasks: [...column.tasks!, newTask],
            }
          })
        }
      }
    }
  ),

  on(TaskActions.deleteTask,
    (state, action): BoardStateInterface => {
      return {
        ...state,
        board: {
          id: state.board.id,
          title: state.board.title,
          description: state.board.description,
          columns: state.board.columns!.map((column: Column) => {
            return column.id !== action.columnId ? column : {
              ...column,
              tasks: column.tasks!.filter(task => task.id !== action.taskId),
            }
          })
        }
      }
    }
  ),

)
