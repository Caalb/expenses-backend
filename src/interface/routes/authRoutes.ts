import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const authController = new AuthController();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               name:
 *                 type: string
 *                 example: "Nome do Usuário"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       422:
 *         description: Dados inválidos
 */
router.post("/signup", (req, res) => authController.signUp(req, res));

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Autentica um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *       422:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/signin", (req, res) => authController.signin(req, res));

export { router as authRoutes };
