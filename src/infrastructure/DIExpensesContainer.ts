import { CreateExpenses } from "../use-cases/expenses/createExpense";
import { GetAllExpenses } from "../use-cases/expenses/getAllExpenses";
import { DeleteExpense } from "../use-cases/expenses/deleteExpense";
import { UpdateExpenses } from "../use-cases/expenses/updateExpense";
import { ExpensesRepository } from "./repositories/ExpensesRepository";
import { UsersRepository } from "./repositories/UsersRepository";
import { SignUpUser } from "../use-cases/auth/signUpUser";
import { SignInUser } from "../use-cases/auth/signInUser";

class DIExpensesContainer {
  private static _expensesRepository = new ExpensesRepository();
  private static _usersRepository = new UsersRepository();

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

  static getUsersRepository(): UsersRepository {
    return this._usersRepository;
  }

  static getSignUpUserUseCase(): SignUpUser {
    return new SignUpUser(DIExpensesContainer.getUsersRepository());
  }

  static getSignInUserUseCase(): SignInUser {
    return new SignInUser(DIExpensesContainer.getUsersRepository());
  }
}

export { DIExpensesContainer };
