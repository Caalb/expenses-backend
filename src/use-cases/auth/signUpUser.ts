import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../domain/entities/Users";
import { UsersRepository } from "../../domain/interfaces/UsersRepository";
import { SignUpUserDto } from "../../interface/dto/SignUpUserDto";
import bcrypt from "bcrypt";
import { AppError } from "../../shared/errors/AppError";
import { HttpStatus } from "../../shared/httpStatus";

export class SignUpUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dto: SignUpUserDto): Promise<User | void> {
    const existingUser = await this.usersRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new AppError(
        "Email já está em uso",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 12);
    const user = new User({
      id: uuidv4(),
      email: dto.email,
      password: hashPassword,
      name: dto.name,
    });

    await this.usersRepository.create(user);

    return user;
  }
}
