import { createAction, props } from '@ngrx/store';
import { Column } from '../../models/interfaces';

export enum ColumnActionType {
  ADD_COLUMN = '[Board] Add Column',
  ADD_COLUMN_SUCCESS = '[Board] Add Column success',
  EDIT_COLUMN = '[Board] Edit Column',
  EDIT_COLUMN_SUCCESS = '[Board] Edit Column success',
  DELETE_COLUMN = '[Board] Delete Column',
  DELETE_COLUMN_SUCCESS = '[Board] Delete Column success',
}

export enum ColumnsActionType {
  SORT_COLUMNS = '[Board] Columns sorted',
}

export const addColumn = createAction(
  ColumnActionType.ADD_COLUMN,
  props<{ column: Column }>(),
);

export const addColumnSuccess = createAction(
  ColumnActionType.ADD_COLUMN_SUCCESS,
  props<{ createdColumn: Column }>(),
);

export const editColumn = createAction(
  ColumnActionType.EDIT_COLUMN,
  props<{ columnId: string, editedColumn: Column }>(),
);

export const editColumnSuccess = createAction(
  ColumnActionType.EDIT_COLUMN_SUCCESS,
  props<{ editedColumn: Column }>(),
);

export const deleteColumn = createAction(
  ColumnActionType.DELETE_COLUMN,
  props<{ columnId: string }>(),
);

export const deleteColumnSuccess = createAction(
  ColumnActionType.DELETE_COLUMN_SUCCESS,
  props<{ columnId: string }>(),
);

export const columnSorted = createAction(
  ColumnsActionType.SORT_COLUMNS,
  props<{ previousIndex: number, currentIndex: number }>(),
);
