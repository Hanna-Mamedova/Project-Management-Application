import { createAction, props } from '@ngrx/store';
import { Task, EditTaskRequest, AddTaskRequest } from '../../models/interfaces';

export enum TasksActionType {
  DELETE_TASKS = '[Board Tasks] Delete Tasks success',
  SORT_TASKS_IN_COLUMN = '[Board Tasks] Tasks in column sorted',
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
  props<{ columnId: string, task: AddTaskRequest }>(),
);

export const addTaskSuccess = createAction(
  TaskActionType.ADD_TASK_SUCCESS,
  props<{ columnId: string, createdTask: Task }>(),
);

export const editTask = createAction(
  TaskActionType.EDIT_TASK,
  props<{ taskId: string, task: EditTaskRequest }>(),
);

export const editTaskSuccess = createAction(
  TaskActionType.EDIT_TASK_SUCCESS,
  props<{ editedTask: Task }>(),
);

export const deleteTask = createAction(
  TaskActionType.DELETE_TASK,
  props<{ columnId: string, taskId: string }>(),
);

export const deleteTaskSuccess = createAction(
  TaskActionType.DELETE_TASK_SUCCESS,
  props<{ taskId: string }>(),
);

export const deleteColumnTasks = createAction(
  TasksActionType.DELETE_TASKS,
);

export const sortTasksInColumn = createAction(
  TasksActionType.SORT_TASKS_IN_COLUMN,
  props<{columnId: string, previousIndex: number, currentIndex: number }>(),
);
