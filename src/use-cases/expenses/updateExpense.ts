import { Expenses } from "../../domain/entities/Expenses";
import { ExpensesRepository } from "../../domain/interfaces/ExpensesRepository";
import { CreateExpensesDto } from "../../interface/dto/CreateExpensesDto";
import { AppError } from "../../shared/errors/AppError";
import { HttpStatus } from "../../shared/httpStatus";

export class UpdateExpenses {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(id: string, dto: CreateExpensesDto): Promise<Expenses> {
    const expense = await this.expensesRepository.getById(id);

    if (!expense) {
      throw new AppError("Despesa não encontrada", HttpStatus.NOT_FOUND);
    }

    expense.description = dto.description;
    expense.amount = dto.amount;
    expense.date = dto.date;

    await this.expensesRepository.update(expense);

    return expense;
  }
}
