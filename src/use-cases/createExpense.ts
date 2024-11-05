import { Expenses } from "../domain/entities/Expenses";
import { ExpensesRepository } from "../domain/interfaces/ExpensesRepository";
import { CreateExpensesDto } from "../interface/dto/CreateExpensesDto";

export class CreateExpenses {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(dto: CreateExpensesDto): Promise<Expenses> {
    const expenses = new Expenses(dto.description, dto.date, dto.amount);

    await this.expensesRepository.create(expenses);

    return expenses;
  }
}
