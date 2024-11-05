import express from "express";
import { extensesRoutes } from "./interface/routes/extensesRoutes";
import { errorHandler } from "./interface/middleware/errorHandler";
import { logger } from "./infrastructure/logger";
import { setupSwagger } from "./interface/swagger";

const app = express();

app.use(express.json());
app.use("/", extensesRoutes);
app.get("/ping", (req, res) => {
  res.send("pong");
});

setupSwagger(app);
app.use(errorHandler);
app.listen(3000, () => {
  logger.info(`Server is running on port ${3000}`);
});
