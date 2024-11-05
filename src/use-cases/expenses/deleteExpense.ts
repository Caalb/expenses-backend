import { Expenses } from "../../domain/entities/Expenses";
import { ExpensesRepository } from "../../domain/interfaces/ExpensesRepository";

export class DeleteExpense {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(id: string): Promise<Expenses> {
    const expense = await this.expensesRepository.getById(id);

    if (!expense) {
      throw new Error("Expense not found");
    }

    await this.expensesRepository.delete(expense.id);
    return expense;
  }
}
