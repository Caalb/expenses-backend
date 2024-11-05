import { HttpStatus } from "../httpStatus";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
  }
}
