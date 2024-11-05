import { Expenses } from "../../domain/entities/Expenses";
import { ExpensesRepository } from "../../domain/interfaces/ExpensesRepository";

export class GetAllExpenses {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(): Promise<Expenses[]> {
    return await this.expensesRepository.getAll();
  }
}
