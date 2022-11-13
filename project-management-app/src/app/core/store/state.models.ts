import { Board, Task } from '../models/interfaces';

export interface BoardsStateInterface {
  boards: Board[],
  error?: string,
}

export interface BoardStateInterface {
  board: Board,
  error?: string,
}

export interface TasksStateInterface {
  tasks: Task[],
  error?: string,
}