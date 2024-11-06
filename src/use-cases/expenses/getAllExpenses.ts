import { Expenses } from "../../domain/entities/Expenses";
import { ExpensesRepository } from "../../domain/interfaces/ExpensesRepository";

export class GetAllExpenses {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(userId: string): Promise<Expenses[]> {
    return await this.expensesRepository.getAll(userId);
  }
}
