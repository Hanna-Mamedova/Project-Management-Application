import { createAction, props } from '@ngrx/store';
import { Column } from '../../models/interfaces';

export enum ColumnActionType {
  GET_COLUMN = '[Column] Get Column success',
  GET_COLUMN_FAILURE = '[Column] Get Column success',
  ADD_COLUMN = '[Column] Add Column success',
  ADD_COLUMN_FAILURE = '[Column] Add Column failure',
  EDIT_COLUMN = '[Column] Edit Column success',
  EDIT_COLUMN_FAILURE = '[Column] Edit Column failure',
  DELETE_COLUMN = '[Column] Delete Task success',
  DELETE_COLUMN_FAILURE = '[Column] Edit Column failure',
};

export enum ColumnsActionType {
  GET_COLUMNS = '[Columns] Get Columns success',
  GET_COLUMNS_FAILURE = '[Columns] Get Columns failure',
}

export const getTaskSuccess = createAction(
  ColumnActionType.GET_COLUMN,
  props<{ column: Column }>(),
);

export const getTaskFailure = createAction(
  ColumnActionType.GET_COLUMN_FAILURE,
  props<{ error: string }>(),
);

export const addTaskSuccess = createAction(
  ColumnActionType.ADD_COLUMN,
  props<{ column: Column }>(),
);

export const addTaskFailure = createAction(
  ColumnActionType.ADD_COLUMN_FAILURE,
  props<{ error: string }>(),
);

export const editTaskSuccess = createAction(
  ColumnActionType.EDIT_COLUMN,
  props<{ column: Column }>(),
);

export const editTaskFailure = createAction(
  ColumnActionType.EDIT_COLUMN_FAILURE,
  props<{ error: string }>(),
);

export const deleteColumn = createAction(ColumnActionType.DELETE_COLUMN);

export const getTasksSuccess = createAction(
  ColumnsActionType.GET_COLUMNS,
  props<{ columns: Column[] }>(),
);

export const getTasksFailure = createAction(
  ColumnsActionType.GET_COLUMNS_FAILURE,
  props<{ error: string }>(),
);
