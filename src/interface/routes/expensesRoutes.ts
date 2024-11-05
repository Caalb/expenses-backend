import { Router } from "express";
import { ExpensesController } from "../controllers/ExpensesController";

const router = Router();

const expensesController = new ExpensesController();

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Retorna todas as despesas
 *     responses:
 *       200:
 *         description: Lista de despesas
 */

router.get("/expenses", (req, res) => expensesController.getAll(req, res));

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Cria uma nova despesa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 maxLength: 191
 *                 example: "Compra de materiais de escritório"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-10-01T00:00:00Z"
 *               amount:
 *                 type: number
 *                 example: 150.75
 *     responses:
 *       201:
 *         description: Despesa criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 description:
 *                   type: string
 *                   example: "Compra de materiais de escritório"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T00:00:00Z"
 *                 amount:
 *                   type: number
 *                   example: 150.75
 *       400:
 *         description: Requisição inválida
 */
router.post("/expenses", (req, res) => expensesController.create(req, res));

export { router as expensesRoutes };
