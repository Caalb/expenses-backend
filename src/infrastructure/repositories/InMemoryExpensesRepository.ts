import { Expenses } from "../../domain/entities/Expenses";
import { ExpensesRepository } from "../../domain/interfaces/ExpensesRepository";

export class InMemoryExpensesRepository implements ExpensesRepository {
  private expenses: Expenses[] = [];

  async create(expenses: Expenses): Promise<void> {
    this.expenses.push(expenses);
  }

  async getAll(): Promise<Expenses[]> {
    return this.expenses;
  }

  async getById(id: string): Promise<Expenses | null> {
    return this.expenses.find((expense) => expense.id === id) || null;
  }

  async update(expenses: Expenses): Promise<void> {
    const index = this.expenses.findIndex(
      (expense) => expense.id === expenses.id
    );
    this.expenses[index] = expenses;
  }

  async delete(id: string): Promise<void> {
    const index = this.expenses.findIndex((expense) => expense.id === id);
    this.expenses.splice(index, 1);
  }
}
