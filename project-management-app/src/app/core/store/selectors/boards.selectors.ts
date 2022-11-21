import { BoardsStateInterface, BoardStateInterface } from '../state.models';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectFeatureBoards = createFeatureSelector<BoardsStateInterface>('boards');
export const selectBoard = createFeatureSelector<BoardStateInterface>('board');

export const selectBoards = createSelector(
  selectFeatureBoards,
  (state) => state.boards,
);

export const selectColumns = createSelector(
  selectBoard,
  (state) => state.board.columns!,
);

export const selectBoardId = createSelector(
  selectBoard,
  (state) => state.board.id!,
);

export const selectBoardTitle = createSelector(
  selectBoard,
  (state) => state.board.title,
)

