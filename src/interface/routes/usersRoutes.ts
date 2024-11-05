import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const authController = new AuthController();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todas as contas de usuário
 *     responses:
 *       200:
 *         description: Lista de contas de usuário
 */

router.post("/", (req, res) => authController.signUp(req, res));

export { router as usersRoutes };
