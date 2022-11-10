import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/interfaces';

export enum BoardActionType {
  GET_BOARD = '[Board] Get Board',
  GET_BOARD_FAILURE = '[Board] Get Board failure',
  ADD_BOARD = '[Main Board] Add Board',
  EDIT_BOARD = '[Main Board] Edit Board',
  DELETE_BOARD = '[Main Board] Delete Board',
};

export const getBoard = createAction(
  BoardActionType.GET_BOARD,
  props<{ board: Board }>(),
);

export const getBoardFailure = createAction(
  BoardActionType.GET_BOARD_FAILURE,
  props<{ error: string }>(),
);
