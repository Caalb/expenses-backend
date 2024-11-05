import { UsersEntity } from "../../infrastructure/database/entities/UsersEntity";
import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";

export class UsersRepository {
  private repository: Repository<UsersEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UsersEntity);
  }

  async create(user: UsersEntity): Promise<void> {
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<UsersEntity | null> {
    return await this.repository.findOneBy({ email });
  }
}
