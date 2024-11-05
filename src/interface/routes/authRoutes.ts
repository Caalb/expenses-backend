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

router.post("/signup", (req, res) => authController.signUp(req, res));

router.post("/signin", (req, res) => authController.signin(req, res));

export { router as authRoutes };
