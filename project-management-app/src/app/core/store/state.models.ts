import { Board } from "../models/interfaces";

export interface BoardsStateInterface {
  boards: Board[],
  error?: string,
}
