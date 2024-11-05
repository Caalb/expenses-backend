import { CreateExpenses } from "../use-cases/createExpense";
import { GetAllExpenses } from "../use-cases/getAllExpenses";
import { ExpensesRepository } from "./repositories/ExpensesRepository";
import { CreateExpensesDto } from "../interface/dto/CreateExpensesDto";
import { validate } from "class-validator";

class DIContainer {
  private static _expensesRepository = new ExpensesRepository();

  static getExpensesRepository(): ExpensesRepository {
    return this._expensesRepository;
  }

  static getGetAllExpensesUseCase(): GetAllExpenses {
    return new GetAllExpenses(DIContainer.getExpensesRepository());
  }

  static getCreateExpensesUseCase(): CreateExpenses {
    return new CreateExpenses(DIContainer.getExpensesRepository());
  }
}

export { DIContainer };
