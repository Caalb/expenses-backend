import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../domain/entities/Users";
import { UsersRepository } from "../../domain/interfaces/UsersRepository";
import { SignUpUserDto } from "../../interface/dto/SignUpUserDto";
import bcrypt from "bcrypt";

export class SignUpUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dto: SignUpUserDto, res: Response): Promise<User | void> {
    const existingUser = await this.usersRepository.findByEmail(dto.email);

    if (existingUser) {
      res.status(422).json({ message: "Email já está em uso" });

      return;
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
