import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/interfaces';

export enum TasksActionType {
  GET_TASKS = '[Board Tasks] Get Tasks success',
  GET_TASKS_FAILURE = '[Board Tasks] Get Tasks failure',
}

export enum TaskActionType {
  GET_TASK = '[Board Task] Get Task success',
  GET_TASK_FAILURE = '[Board Task] Get Task failure',
  ADD_TASK = '[Board Task] Add Task',
  EDIT_TASK = '[Board Task] Edit Task',
  DELETE_TASK = '[Board Task] Delete Task',
};

export const getTask = createAction(
  TaskActionType.GET_TASK,
  props<{ task: Task }>(),
);

export const getTaskFailure = createAction(
  TaskActionType.GET_TASK_FAILURE,
  props<{ error: string }>(),
);

export const addTask = createAction(
  TaskActionType.ADD_TASK,
  props<{ task: Task }>(),
);

export const editTask = createAction(
  TaskActionType.EDIT_TASK,
  props<{ task: Task }>(),
);

export const deleteTask = createAction(
  TaskActionType.DELETE_TASK,
  props<{ taskId: string }>(),
);

export const getTasks = createAction(
  TasksActionType.GET_TASKS,
  props<{ tasks: Task[] }>(),
);

export const getTasksFailure = createAction(
  TasksActionType.GET_TASKS_FAILURE,
  props<{ error: string }>(),
);
