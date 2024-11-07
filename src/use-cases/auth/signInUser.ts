import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UsersRepository } from "../../domain/interfaces/UsersRepository";
import { SignInUserDto } from "../../interface/dto/SignInUserDto";
import { AppError } from "../../shared/errors/AppError";
import { HttpStatus } from "../../shared/httpStatus";

export class SignInUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dto: SignInUserDto): Promise<void | string> {
    const existingUser = await this.usersRepository.findByEmail(dto.email);

    if (!existingUser) {
      throw new AppError(
        "Email ou senha inválidos",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      dto.password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throw new AppError(
        "Email ou senha inválidos",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new AppError(
        "JWT_SECRET is not defined",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  }
}
