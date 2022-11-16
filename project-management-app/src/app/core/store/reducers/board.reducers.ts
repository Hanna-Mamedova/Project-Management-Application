import { createReducer, on, ActionReducerMap } from '@ngrx/store';
import * as BoardActions from '../actions/boards.actions';
import * as ColumnActions from '../actions/columns.actions';
import * as TaskActions from '../actions/tasks.actions';
import { BoardStateInterface } from '../state.models';
import { Task, Column } from '../../models/interfaces';
import { initialBoardState } from '../initial-states';
import { move } from '../sort-function';


export const boardReducers = createReducer(
  initialBoardState,
  on(BoardActions.getBoardSuccess,
    (state, action): BoardStateInterface => ({
      ...state,
      board: action.board,
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

  on(
    TaskActions.sortTasksWithinColumns,
    (state, action): BoardStateInterface => {
      const { board: { id, title, description } } = state;
      const movedTask = state.board.columns!.find(column => column.id === action.previousColumnId)!.tasks![action.previousIndex];

      return {
        ...state,
        board: {
          id,
          title,
          description,
          columns: state.board.columns!.map((column: Column) => {
            if (column.id === action.previousColumnId) {
              return {
                ...column,
                tasks: [...column.tasks!].filter((task, index) => index !== action.previousIndex),
              }
            };

            const newTasks = [...column.tasks!];
            newTasks.splice(action.currentIndex, 0, movedTask);

            if (column.id === action.currentColumnId) {
              return {
                ...column,
                tasks: column.tasks!.length !== 0 ? newTasks : [movedTask],
              }
            }
            return column;
          })
        },
      };
    },
  ),

);
