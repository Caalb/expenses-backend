import { Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";
import { CreateExpensesDto } from "../dto/CreateExpensesDto";
import { validate } from "class-validator";

export class ExpensesController {
  private getAllExpenses = DIContainer.getGetAllExpensesUseCase();
  private createExpenses = DIContainer.getCreateExpensesUseCase();

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
}
