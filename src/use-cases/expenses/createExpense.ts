import { Expenses } from "../../domain/entities/Expenses";
import { ExpensesRepository } from "../../domain/interfaces/ExpensesRepository";
import { CreateExpensesDto } from "../../interface/dto/CreateExpensesDto";
import { v4 as uuidv4 } from "uuid";
import { EmailUseCases } from "../email/sendCreatedExpensesEmail";
import { IUserJwtPayload } from "../../shared/types/UserJwtPayload";
import { formatDate } from "../../shared/helpers/date";

export class CreateExpenses {
  private emailUseCases: EmailUseCases;

  constructor(private readonly expensesRepository: ExpensesRepository) {
    this.emailUseCases = new EmailUseCases();
  }

  async execute(
    dto: CreateExpensesDto,
    user: IUserJwtPayload
  ): Promise<Expenses> {
    const expenses = new Expenses(
      uuidv4(),
      dto.description,
      dto.date,
      dto.amount,
      {
        id: user.id,
      }
    );

    await this.expensesRepository.create(expenses);

    await this.emailUseCases.sendCreatedExpensesEmail({
      recipient: user.email,
      name: user.name,
      amount: dto.amount,
      date: formatDate(String(dto.date)),
      description: dto.description,
    });

    return expenses;
  }
}
