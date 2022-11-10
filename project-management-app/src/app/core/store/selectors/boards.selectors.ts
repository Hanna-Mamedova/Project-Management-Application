import { BoardsStateInterface } from "../state.models";
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectBoards = createFeatureSelector<BoardsStateInterface>('boards');

export const selectBoard = (id: string) => createSelector(
  selectBoards,
  (state) => state.boards.find((board) => board.id === id)!,
)


