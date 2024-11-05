import { CreateExpenses } from "../use-cases/expenses/createExpense";
import { GetAllExpenses } from "../use-cases/expenses/getAllExpenses";
import { DeleteExpense } from "../use-cases/expenses/deleteExpense";
import { ExpensesRepository } from "./repositories/ExpensesRepository";

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

  static getDeleteExpensesUseCase(): DeleteExpense {
    return new DeleteExpense(DIContainer.getExpensesRepository());
  }
}

export { DIContainer };
