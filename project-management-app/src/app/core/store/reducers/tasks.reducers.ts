import { TasksStateInterface } from "../state.models";
import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions/tasks.actions';

export const initialTasksState: TasksStateInterface = {
  tasks: [],
};

export const tasksReducers = createReducer(
  initialTasksState,
  on(Actions.getTasks,
    (state, action): TasksStateInterface => ({
      ...state,
      tasks: action.tasks,
    })),
  on(Actions.getTasksFailure,
    (state, action): TasksStateInterface => ({
      ...state,
      error: action.error,
    })),
  on(Actions.addTask,
    (state, action): TasksStateInterface => ({
      ...state,
      tasks: [...state.tasks, action.task],
    })),
  on(Actions.deleteTask,
    (state, action): TasksStateInterface => ({
      ...state,
      tasks: []
    })),
);
