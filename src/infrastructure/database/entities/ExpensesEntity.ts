import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("expenses")
export class ExpensesEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  description!: string;

  @Column("decimal")
  amount!: number;

  @Column()
  date!: Date;
}
