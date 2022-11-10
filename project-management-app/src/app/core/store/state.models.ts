import { Column, Task } from "../models/interfaces";

export interface TasksStateInterface {
  tasks: Task[];
  error?: string;
}

export interface ColumnsStateInterface {
  columns: Column[];
  error?: string;
}

export interface BoardStateInterface {
  id?: string,
  title: string,
  description: string,
  columns: ColumnsStateInterface,
}
