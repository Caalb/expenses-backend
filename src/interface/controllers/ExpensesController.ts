import { Request, Response } from "express";
import { DIExpensesContainer } from "../../infrastructure/DIExpensesContainer";
import { CreateExpensesDto } from "../dto/CreateExpensesDto";
import { validate } from "class-validator";
import { AppError } from "../../shared/errors/AppError";

export class ExpensesController {
  private getAllExpenses = DIExpensesContainer.getGetAllExpensesUseCase();
  private createExpenses = DIExpensesContainer.getCreateExpensesUseCase();
  private deleteExpenses = DIExpensesContainer.getDeleteExpensesUseCase();
  private updateExpenses = DIExpensesContainer.getUpdateExpensesUseCase();

  async getAll(req: Request, res: Response): Promise<void> {
    const expenses = await this.getAllExpenses.execute();
    res.status(200).json(expenses);
  }

  async create(req: Request, res: Response): Promise<any> {
    const dto = Object.assign(new CreateExpensesDto(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    const expense = await this.createExpenses.execute(dto);
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

      return res.status(500).json({ message: "Ocorreu um erro interno" });
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

      return res.status(500).json({ message: "Ocorreu um erro interno" });
    }
  }
}
