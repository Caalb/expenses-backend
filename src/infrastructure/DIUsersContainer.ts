import { SignInUser } from "../use-cases/auth/signInUser";
import { UsersRepository } from "./repositories/UsersRepository";
import { SignUpUser } from "../use-cases/auth/signUpUser";

class DIUsersContainer {
  private static _usersRepository = new UsersRepository();

  static getUsersRepository(): UsersRepository {
    return this._usersRepository;
  }

  static getSignUpUserUseCase(): SignUpUser {
    return new SignUpUser(DIUsersContainer.getUsersRepository());
  }

  static getSignInUserUseCase(): SignInUser {
    return new SignInUser(DIUsersContainer.getUsersRepository());
  }
}

export { DIUsersContainer };
