import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const AuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!secretKey) {
    res.status(500).json({ message: "Chave secreta não configurada" });
    return next();
  }

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "Cabeçalho de autorização ausente" });
    return next();
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Nenhum token fornecido" });
    next();
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(token);
      console.log(secretKey);
      return res.status(401).json({ message: "Sessão inválida" });
    }

    req.user = decoded;
    return next();
  });
};
