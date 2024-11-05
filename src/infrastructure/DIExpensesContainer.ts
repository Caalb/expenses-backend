import { CreateExpenses } from "../use-cases/expenses/createExpense";
import { GetAllExpenses } from "../use-cases/expenses/getAllExpenses";
import { DeleteExpense } from "../use-cases/expenses/deleteExpense";
import { UpdateExpenses } from "../use-cases/expenses/updateExpense";
import { ExpensesRepository } from "./repositories/ExpensesRepository";

class DIExpensesContainer {
  private static _expensesRepository = new ExpensesRepository();

  static getExpensesRepository(): ExpensesRepository {
    return this._expensesRepository;
  }

  static getGetAllExpensesUseCase(): GetAllExpenses {
    return new GetAllExpenses(DIExpensesContainer.getExpensesRepository());
  }

  static getCreateExpensesUseCase(): CreateExpenses {
    return new CreateExpenses(DIExpensesContainer.getExpensesRepository());
  }

  static getDeleteExpensesUseCase(): DeleteExpense {
    return new DeleteExpense(DIExpensesContainer.getExpensesRepository());
  }

  static getUpdateExpensesUseCase(): UpdateExpenses {
    return new UpdateExpenses(DIExpensesContainer.getExpensesRepository());
  }
}

export { DIExpensesContainer };
