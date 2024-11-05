import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("expenses")
export class ExpensesEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  description!: string;

  @Column("decimal")
  amount!: number;

  @Column()
  date!: Date;
}
