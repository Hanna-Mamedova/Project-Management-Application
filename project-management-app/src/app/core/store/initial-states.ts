import { BoardsStateInterface, BoardStateInterface } from './state.models';

export const initialBoardsState: BoardsStateInterface = {
  boards: [],
};

export const initialBoardState: BoardStateInterface = {
  board: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
};
