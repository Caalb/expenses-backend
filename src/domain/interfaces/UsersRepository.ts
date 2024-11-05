import { User } from "../entities/Users";

export interface UsersRepository {
  create(expenses: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
