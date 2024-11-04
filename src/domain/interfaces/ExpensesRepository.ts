import { Expenses } from "../entities/Expenses";

export interface ExpensesRepository {
  create(expenses: Expenses): Promise<void>;
  getAll(): Promise<Expenses[]>;
  getById(id: string): Promise<Expenses | null>;
  update(expenses: Expenses): Promise<void>;
  delete(id: string): Promise<void>;
}
