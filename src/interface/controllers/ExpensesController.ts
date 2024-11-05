import { Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CreateExpensesDto } from "../dto/CreateExpensesDto";
import { validate } from "class-validator";
import { DeleteExpense } from "../../use-cases/expenses/deleteExpense";

export class ExpensesController {
  private getAllExpenses = DIContainer.getGetAllExpensesUseCase();
  private createExpenses = DIContainer.getCreateExpensesUseCase();
  private deleteExpenses = DIContainer.getDeleteExpensesUseCase();

  async getAll(req: Request, res: Response): Promise<void> {
    const expenses = await this.getAllExpenses.execute();
    res.status(200).json(expenses);
  }

  async create(req: Request, res: Response): Promise<any> {
    const dto = Object.assign(new CreateExpensesDto(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const expense = await this.createExpenses.execute(dto);
    return res.status(201).json(expense);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const expenseId = req.params.id;
    await this.deleteExpenses.execute(expenseId);
    res.status(204).send();
  }
}
