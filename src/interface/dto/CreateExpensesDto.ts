import {
  IsString,
  IsDate,
  IsNumber,
  MaxLength,
  IsNotEmpty,
} from "class-validator";

export class CreateBookDto {
  @IsString({ message: "A descrição deve ser uma string." })
  @MaxLength(191, {
    message: "A descrição não pode ter mais que 191 caracteres.",
  })
  description!: string;

  @IsDate({ message: "A data deve ser uma data válida." })
  date!: Date;

  @IsNumber()
  @IsNotEmpty({ message: "O valor deve ser um número." })
  value!: number;
}
