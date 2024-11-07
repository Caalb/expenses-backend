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
    res.status(500);
    return;
  }

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "Cabeçalho de autorização ausente" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Nenhum token fornecido" });
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Sessão inválida" });
    }

    req.user = decoded;
    return next();
  });
};
