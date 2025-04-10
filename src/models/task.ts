export interface Task {
  id: string;
  title: string;
  created_at?: string
}

export interface CreateTaskDTO {
  title: string
}

export interface UpdateTaskDTO {
  title: string
}