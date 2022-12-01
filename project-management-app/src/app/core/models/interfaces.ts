export interface User {
  userId: string,
  name: string,
  login: string,
  iat: number,
}

export interface Signin {
  login: string,
  password: string,
}

export interface Signup extends Signin {
  name: string;
}

export interface Board {
  id?: string,
  title: string,
  description: string,
  columns?: Column[],
}

export interface Column {
  id?: string,
  title: string,
  order?: number,
  tasks?: Task[],
}

export interface UpdateColumnRequest {
  title: string,
  order: number,
}

export interface UpdateColumnRespond {
  id: string,
  title: string,
  order: number,
}

export interface Task {
  id?: string,
  title: string,
  order?: number,
  description: string,
  userId: string,
  boardId?: string,
  columnId?: string,
  files?: File[],
}

export interface EditTaskRequest {
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
}

export interface AddTaskRequest {
  title: string,
  description: string,
  userId: string,
}

export interface File {
  filename: string,
  filesize: number,
}

export interface DialogData {
  title: string,
  message: string,
  decline: string,
  confirm: string,
  action: () => void,
}
