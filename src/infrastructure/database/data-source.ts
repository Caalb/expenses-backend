import { DataSource } from "typeorm";
import { ExpensesEntity } from "./entities/ExpensesEntity";
import { UsersEntity } from "./entities/UsersEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ExpensesEntity, UsersEntity],
  synchronize: true,
});
