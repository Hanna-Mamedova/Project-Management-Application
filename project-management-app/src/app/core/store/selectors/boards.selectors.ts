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

export const selectSearchedBoards = (searchValue: string) => createSelector(
  selectFeatureBoards,
  (state) => state.boards.filter(board => board.title.toLowerCase().includes(searchValue) ||
    board.description.toLowerCase().includes(searchValue)),
);

export const selectSearchedColumns = (searchValue: string) => createSelector(
  selectBoard,
  (state) => state.board.columns!.filter(column => column.title.toLowerCase().includes(searchValue) ||
    column.tasks?.some(task => task.title.toLowerCase().includes(searchValue) ||
      task.description.toLowerCase().includes(searchValue))),
);

