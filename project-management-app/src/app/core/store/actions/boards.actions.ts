import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/interfaces';

export enum BoardActionType {
  GET_BOARDS = '[Main Boards] Get Boards',
  GET_BOARDS_SUCCESS = '[Main Boards] Get Boards success',
  GET_BOARDS_FAILURE = '[Main Boards] Get Boards failure',

  GET_BOARD = '[Board] Get Board',
  GET_BOARD_SUCCESS = '[Board] Get Board success',

  ADD_BOARD = '[Main Board] Add Board',
  ADD_BOARD_SUCCESS = '[Main Board] Add Board success',
  ADD_BOARD_FAILURE = '[Main Board] Add Board failure',

  EDIT_BOARD = '[Main Board] Edit Board',
  EDIT_BOARD_SUCCESS = '[Main Board] Edit Board success',
  EDIT_BOARD_FAILURE = '[Main Board] Edit Board failure',
  EDIT_BOARD_TITLE = '[Board] Edit Board Title',

  DELETE_BOARD = '[Main Board] Delete Board',
  DELETE_BOARD_SUCCESS = '[Main Board] Delete Board success',
  DELETE_BOARD_FAILURE = '[Main Board] Delete Board failure',
}

export const getBoards = createAction(BoardActionType.GET_BOARDS);

export const getBoardsSuccess = createAction(
  BoardActionType.GET_BOARDS_SUCCESS,
  props<{ boards: Board[]; }>(),
);

export const getBoardsFailure = createAction(
  BoardActionType.GET_BOARDS_FAILURE,
  props<{ error: string; }>(),
);

//actions for Boards in Main
export const addBoard = createAction(
  BoardActionType.ADD_BOARD,
  props<{ boardItem: Omit<Board, 'id'>; }>(),
);

export const addBoardSuccess = createAction(
  BoardActionType.ADD_BOARD_SUCCESS,
  props<{ boardItem: Board; }>(),
);

export const addBoardFailure = createAction(
  BoardActionType.ADD_BOARD_FAILURE,
  props<{ error: string; }>(),
);

export const editBoard = createAction(
  BoardActionType.EDIT_BOARD,
  props<{ boardId: string, boardItem: Omit<Board, 'id'>; }>(),
);

export const editBoardSuccess = createAction(
  BoardActionType.EDIT_BOARD_SUCCESS,
  props<{ boardItem: Board; }>(),
);

export const editBoardFailure = createAction(
  BoardActionType.EDIT_BOARD_FAILURE,
  props<{ error: string; }>(),
);

export const deleteBoard = createAction(
  BoardActionType.DELETE_BOARD,
  props<{ boardId: string; }>(),
);

export const deleteBoardSuccess = createAction(
  BoardActionType.DELETE_BOARD_SUCCESS,
  props<{ boardId: string; }>(),
);

export const deleteBoardFailure = createAction(
  BoardActionType.DELETE_BOARD_FAILURE,
  props<{ error: string; }>(),
);

export const getBoard = createAction(
  BoardActionType.GET_BOARD,
  props<{ boardId: string }>(),
  );

export const getBoardSuccess = createAction(
  BoardActionType.GET_BOARD_SUCCESS,
  props<{ board: Board; }>(),
);

export const editBoardTitle = createAction(
  BoardActionType.EDIT_BOARD_TITLE,
  props<{ boardId: string, boardItem: Omit<Board, 'id'>; }>(),
);

