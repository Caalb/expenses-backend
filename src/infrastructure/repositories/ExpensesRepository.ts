import { ExpensesEntity } from "../../infrastructure/database/entities/ExpensesEntity";
import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";

export class ExpensesRepository {
  private repository: Repository<ExpensesEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ExpensesEntity);
  }

  async create(expenses: ExpensesEntity): Promise<void> {
    await this.repository.save(expenses);
  }

  async getAll(): Promise<ExpensesEntity[]> {
    return await this.repository.find();
  }

  async getById(id: string): Promise<ExpensesEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(expenses: ExpensesEntity): Promise<void> {
    await this.repository.save(expenses);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
