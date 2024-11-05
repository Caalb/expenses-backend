import "reflect-metadata";
import express from "express";
import { expensesRoutes } from "./interface/routes/expensesRoutes";
import { errorHandler } from "./interface/middleware/errorHandler";
import { logger } from "./infrastructure/logger";
import { setupSwagger } from "./interface/swagger";
import { AppDataSource } from "./infrastructure/database/data-source";

const app = express();

AppDataSource.initialize()
  .then(() => {
    logger.info("Database connected");
  })
  .catch((error) => {
    logger.error("Error connecting to database:", error);
  });

app.use(express.json());
app.use("/", expensesRoutes);
app.get("/ping", (req, res) => {
  res.send("pong");
});

setupSwagger(app);
app.use(errorHandler);
app.listen(3000, () => {
  logger.info(`Server is running on port ${3000}`);
});
