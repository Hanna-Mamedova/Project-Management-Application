import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/interfaces';

export enum BoardActionType {
  GET_BOARDS = '[Main Boards] Get Boards',
  GET_BOARDS_SUCCESS = '[Main Boards] Get Boards success',
  GET_BOARDS_FAILURE = '[Main Boards] Get Boards failure',
  GET_BOARD = '[Board] Get Board',
  ADD_BOARD = '[Main Board] Add Board',
  EDIT_BOARD = '[Main Board] Edit Board',
  DELETE_BOARD = '[Main Board] Delete Board',
};

export const getBoards = createAction(BoardActionType.GET_BOARDS);

export const getBoardsSuccess = createAction(
  BoardActionType.GET_BOARDS_SUCCESS,
  props<{ boards: Board[] }>(),
);

export const getBoardsFailure = createAction(
  BoardActionType.GET_BOARDS_FAILURE,
  props<{ error: string }>(),
);

export const addBoardFormSubmitted = createAction(
  BoardActionType.ADD_BOARD,
  props<{ boardItem: Board }>()
);

export const editBoardFormSubmitted = createAction(
  BoardActionType.EDIT_BOARD,
  props<{ boardItem: Board }>()
);

export const deleteBoardInitiated = createAction(
  BoardActionType.DELETE_BOARD,
  props<{ menuId: string }>()
);

export const getBoardById = createAction(BoardActionType.GET_BOARD);


