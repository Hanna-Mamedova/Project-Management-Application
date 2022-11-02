export interface Task {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
  files: [
    {
      filename: string,
      fileSize: number,
    }
  ],
}