import { ColumnsStateInterface } from "../state.models";
import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions/columns.actions';

export const initialTasksState: ColumnsStateInterface = {
  columns: [],
};

export const tasksReducers = createReducer(
  initialTasksState,
  on(Actions.getTaskSuccess,
    (state, action): ColumnsStateInterface => ({
      ...state,
      columns: action.tasks,
    })),
  on(Actions.getTasksFailure,
    (state, action): ColumnsStateInterface => ({
      ...state,
      error: action.error,
    })),
);
