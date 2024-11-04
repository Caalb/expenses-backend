import { Router } from "express";
import { InMemoryExpensesRepository } from "../../infrastructure/repositories/InMemoryExpensesRepository";
import { GetAllExpenses } from "../../use-cases/getAllExpenses";
import { ExtensesController } from "../controllers/ExtensesController";

const router = Router();

const expensesRepository = new InMemoryExpensesRepository();
const getAllExpensesUseCase = new GetAllExpenses(expensesRepository);
const extensesController = new ExtensesController(getAllExpensesUseCase);

router.get("/extenses", (req, res) => extensesController.getAll(req, res));

export { router as extensesRoutes };
