import { User, UserInput } from './user';

export interface UserRepository {
  createUser(user: UserInput): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<User>;
}

