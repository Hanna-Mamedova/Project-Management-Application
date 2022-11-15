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

function move<T>(arr: (T | undefined)[], previousIndex: number, currentIndex: number) {
  arr = [...arr];
  while (previousIndex < 0) {
    previousIndex += arr.length;
  }
  while (currentIndex < 0) {
    currentIndex += arr.length;
  }
  if (currentIndex >= arr.length) {
    let k = currentIndex - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(currentIndex, 0, arr.splice(previousIndex, 1)[0]);
  return arr;
}

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
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: [...state.board.columns!, action.createdColumn],
        },
      };

    },
  ),

  on(ColumnActions.editColumnSuccess,
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;
      const { editedColumn } = action;

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: state.board.columns!.map(column => {
            return column.id !== editedColumn.id ? column : {
              ...column,
              title: editedColumn.title,
              tasks: [...column.tasks!],
            };
          }),
        },
      };
    },
  ),

  on(ColumnActions.deleteColumn,
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;

      const columnIndex = state.board.columns!.findIndex(column => column.id === action.columnId);
      const updatedColumns = [...state.board.columns!];
      updatedColumns.splice(columnIndex, 1);

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: updatedColumns,
        },
      };
    },
  ),

  on(TaskActions.addTaskSuccess,
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: state.board.columns!.map((column: Column) => {
            return column.id !== action.columnId ? column : {
              ...column,
              tasks: column.tasks ? [...column.tasks!, action.createdTask] : [action.createdTask],
            };
          }),
        },
      };
    },
  ),

  on(TaskActions.deleteTask,
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: state.board.columns!.map((column: Column) => {
            return column.id !== action.columnId ? column : {
              ...column,
              tasks: column.tasks!.filter(task => task.id !== action.taskId),
            };
          }),
        },
      };
    },
  ),

  on(TaskActions.editTaskSuccess,
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;
      const { editedTask } = action;

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: state.board.columns!.map((column: Column) => {
            return column.id !== editedTask.columnId ? column : {
              ...column,
              tasks: column.tasks!.map((task: Task) => {
                return task.id !== editedTask.id ? task : editedTask;
              }),
            };
          }),
        },
      };
    },
  ),

  on(
    ColumnActions.sortColumns,
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: move(state.board.columns!, action.previousIndex, action.currentIndex) as Column[],
        },
      };
    },
  ),

  on(
    TaskActions.sortTasksInColumn,
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: state.board.columns!.map((column: Column) => {
            return column.id !== action.columnId ? column : {
              ...column,
              tasks: move(column.tasks!, action.previousIndex, action.currentIndex) as Task[],
            }
          })
        },
      };
    },
  ),

);
