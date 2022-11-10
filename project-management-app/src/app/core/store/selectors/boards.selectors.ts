import { BoardsStateInterface, BoardStateInterface } from "../state.models";
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const boardsSelector = createFeatureSelector<BoardsStateInterface>('boards');
export const selectBoard = createFeatureSelector<BoardStateInterface>('board');

export const selectBoards = createSelector(
  boardsSelector,
  (state) => state.boards,
)

export const selectColumns = createSelector(
  selectBoard,
  (state) => state.board.columns!,
);

export const selectColumnById = (id: string) => createSelector(
  selectBoard,
  (state) => state.board.columns!.find((column) => column.id === id)!,
);


