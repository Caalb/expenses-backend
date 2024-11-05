import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { expensesRoutes } from "./interface/routes/expensesRoutes";
import { errorHandler } from "./interface/middleware/errorHandler";
import { logger } from "./infrastructure/logger";
import { setupSwagger } from "./interface/swagger";
import { AppDataSource } from "./infrastructure/database/data-source";
import { authRoutes } from "./interface/routes/authRoutes";
import { AuthMiddleware } from "./interface/middleware/auth";

const app = express();

AppDataSource.initialize()
  .then(() => {
    logger.info("Database connected");
  })
  .catch((error) => {
    logger.error("Error connecting to database:", error);
  });

app.use(express.json());
app.use("/auth", authRoutes);
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/", AuthMiddleware, expensesRoutes);

setupSwagger(app);
app.use(errorHandler);

const port = process.env.NODE_LOCAL_PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
