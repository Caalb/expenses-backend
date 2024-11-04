import { InMemoryExpensesRepository } from "./repositories/InMemoryExpensesRepository";
import { GetAllExpenses } from "../use-cases/getAllExpenses";

class DIContainer {
  private static _expensesRepository = new InMemoryExpensesRepository();

  static getExpensesRepository(): InMemoryExpensesRepository {
    return this._expensesRepository;
  }

  static getGetAllExpensesUseCase(): GetAllExpenses {
    return new GetAllExpenses(this._expensesRepository);
  }
}

export { DIContainer };
