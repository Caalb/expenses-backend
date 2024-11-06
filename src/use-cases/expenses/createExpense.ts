import { Expenses } from "../../domain/entities/Expenses";
import { ExpensesRepository } from "../../domain/interfaces/ExpensesRepository";
import { CreateExpensesDto } from "../../interface/dto/CreateExpensesDto";
import { v4 as uuidv4 } from "uuid";

export class CreateExpenses {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute(dto: CreateExpensesDto, userId: string): Promise<Expenses> {
    const expenses = new Expenses(
      uuidv4(),
      dto.description,
      dto.date,
      dto.amount,
      {
        id: userId,
      }
    );

    await this.expensesRepository.create(expenses);

    return expenses;
  }
}
