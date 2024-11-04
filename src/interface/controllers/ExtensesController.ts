import { Request, Response } from "express";
import { DIContainer } from "../../infrastructure/DIContainer";

export class ExtensesController {
  private getAllExpenses = DIContainer.getGetAllExpensesUseCase();

  async getAll(req: Request, res: Response): Promise<void> {
    const expenses = await this.getAllExpenses.execute();
    res.status(200).json(expenses);
  }
}
