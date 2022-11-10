import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/interfaces';

export enum BoardActionType {
  GET_BOARDS = '[Main Boards] Get Boards',
  GET_BOARDS_SUCCESS = '[Main Boards] Get Boards success',
  GET_BOARDS_FAILURE = '[Main Boards] Get Boards failure',
  GET_BOARD = '[Board] Get Board',
  GET_BOARD_SUCCESS = '[Board] Get Board success',
  GET_BOARD_FAILURE = '[Board] Get Board failure',
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
  props<{ boardId: string }>()
);

export const getBoard = createAction(BoardActionType.GET_BOARD);

export const getBoardSuccess = createAction(
  BoardActionType.GET_BOARD_SUCCESS,
  props<{ board: Board }>()
);

export const getBoardFailure = createAction(
  BoardActionType.GET_BOARD_FAILURE,
  props<{ error: string }>(),
);

