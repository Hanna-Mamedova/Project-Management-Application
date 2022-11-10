import { BoardStateInterface, TasksStateInterface } from "../state.models";
import { createSelector } from '@ngrx/store';

export const tasksSelector = (state: TasksStateInterface) => state;

export const columnsSelector = (state: BoardStateInterface) => state.columns;

export const selectTasks = createSelector(
  tasksSelector,
  (state) => state.tasks,
);

export const selectTasksError = createSelector(
  tasksSelector,
  (state) => state.error,
);

export const selectColumns = createSelector(
  columnsSelector,
  (state) => state.columns,
);

export const selectColumnsError = createSelector(
  columnsSelector,
  (state) => state.error,
);
