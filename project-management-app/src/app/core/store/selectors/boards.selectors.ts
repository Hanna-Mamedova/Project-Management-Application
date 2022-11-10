import { BoardsStateInterface, BoardStateInterface } from "../state.models";
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectBoards = createFeatureSelector<BoardsStateInterface>('boards');
export const selectBoard = createFeatureSelector<BoardStateInterface>('board');

export const selectColumns = createSelector(
  selectBoard,
  (state) => state.board.columns!,
);

export const selectColumnById = (id: string) => createSelector(
  selectBoard,
  (state) => state.board.columns!.find((column) => column.id === id)!,
);


