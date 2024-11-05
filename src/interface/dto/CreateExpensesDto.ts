import {
  IsString,
  IsDate,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  IsDateString,
  IsISO8601,
} from "class-validator";

export class CreateExpensesDto {
  @IsString({ message: "A descrição deve ser uma string." })
  @MaxLength(191, {
    message: "A descrição não pode ter mais que 191 caracteres.",
  })
  description!: string;

  @IsDateString({}, { message: "A data deve ser uma data válida." })
  date!: Date;

  @IsNumber()
  @IsNotEmpty({ message: "O valor deve ser um número." })
  amount!: number;
}
