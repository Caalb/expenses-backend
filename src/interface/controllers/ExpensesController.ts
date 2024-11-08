import { validate } from "class-validator";
import { Request, Response } from "express";
import { DIExpensesContainer } from "../../infrastructure/DIExpensesContainer";
import { AppError } from "../../shared/errors/AppError";
import { IUserJwtPayload } from "../../shared/types/UserJwtPayload";
import { CreateExpensesDto } from "../dto/CreateExpensesDto";

interface IAuthenticatedRequest extends Request {
  user?: { id: string };
}
export class ExpensesController {
  private getAllExpenses = DIExpensesContainer.getGetAllExpensesUseCase();
  private createExpenses = DIExpensesContainer.getCreateExpensesUseCase();
  private deleteExpenses = DIExpensesContainer.getDeleteExpensesUseCase();
  private updateExpenses = DIExpensesContainer.getUpdateExpensesUseCase();

  async getAll(req: IAuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Nenhum usuário autenticado" });

      return;
    }

    const expenses = await this.getAllExpenses.execute(userId);
    res.status(200).json(expenses);
  }

  async create(req: IAuthenticatedRequest, res: Response): Promise<any> {
    const dto = Object.assign(new CreateExpensesDto(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Nenhum usuário autenticado" });
    }

    const expense = await this.createExpenses.execute(
      dto,
      req.user as IUserJwtPayload
    );

    return res.status(201).json(expense);
  }

  async update(req: Request, res: Response): Promise<any> {
    const expenseId = req.params.id;
    const dto = Object.assign(new CreateExpensesDto(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }
    try {
      const expense = await this.updateExpenses.execute(expenseId, dto);
      return res.status(200).json(expense);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      return res.status(500);
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    const expenseId = req.params.id;

    try {
      await this.deleteExpenses.execute(expenseId);

      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      return res.status(500);
    }
  }
}
