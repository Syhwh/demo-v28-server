export interface Project {
  id: string;
  name: string;
  description?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ProjectInput {
  name: string;
  description?: string;
  dueDate?: Date;
  userId: string;
}