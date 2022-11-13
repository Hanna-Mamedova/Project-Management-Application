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
  ADD_TASK_SUCCESS = '[Board Task] Add Task success',
  EDIT_TASK = '[Board Task] Edit Task',
  EDIT_TASK_SUCCESS = '[Board Task] Edit Task success',
  DELETE_TASK = '[Board Task] Delete Task',
  DELETE_TASK_SUCCESS = '[Board Task] Delete Task success',
}


export const addTask = createAction(
  TaskActionType.ADD_TASK,
  props<{ columnId: string, task: Task }>(),
);

export const addTaskSuccess = createAction(
  TaskActionType.ADD_TASK_SUCCESS,
  props<{ columnId: string, createdTask: Task }>(),
);

export const editTask = createAction(
  TaskActionType.EDIT_TASK,
  props<{ columnId: string, task: Task }>(),
);

export const editTaskSuccess = createAction(
  TaskActionType.EDIT_TASK_SUCCESS,
  props<{ columnId: string, editedTask: Task }>(),
);

export const deleteTask = createAction(
  TaskActionType.DELETE_TASK,
  props<{ columnId: string, taskId: string }>(),
);

export const deleteTaskSuccess = createAction(
  TaskActionType.DELETE_TASK_SUCCESS,
  props<{ taskId: string }>(),
);

//NEEDED????

export const getTasks = createAction(
  TasksActionType.GET_TASKS,
  props<{ tasks: Task[] }>(),
);

export const getTasksFailure = createAction(
  TasksActionType.GET_TASKS_FAILURE,
  props<{ error: string }>(),
);

export const getTask = createAction(
  TaskActionType.GET_TASK,
  props<{ task: Task }>(),
);

export const getTaskFailure = createAction(
  TaskActionType.GET_TASK_FAILURE,
  props<{ error: string }>(),
);
