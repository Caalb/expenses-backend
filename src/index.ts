import express from "express";
import { extensesRoutes } from "./interface/routes/extensesRoutes";
import { errorHandler } from "./interface/middleware/errorHandler";

const app = express();

app.use(express.json());
app.use("/", extensesRoutes);
app.use(errorHandler);
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
