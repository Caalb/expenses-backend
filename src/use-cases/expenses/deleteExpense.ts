import { Expenses } from "../../domain/entities/Expenses";
import { ExpensesRepository } from "../../domain/interfaces/ExpensesRepository";
import { AppError } from "../../shared/errors/AppError";
import { HttpStatus } from "../../shared/httpStatus";

export class DeleteExpense {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(id: string): Promise<Expenses | AppError> {
    const expense = await this.expensesRepository.getById(id);

    if (!expense) {
      throw new AppError("Despesa não encontrada", HttpStatus.NOT_FOUND);
    }

    await this.expensesRepository.delete(expense.id);
    return expense;
  }
}
