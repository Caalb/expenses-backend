import { DataSource } from "typeorm";
import { ExpensesEntity } from "./entities/ExpensesEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "expenses",
  entities: [ExpensesEntity],
  synchronize: true,
});
