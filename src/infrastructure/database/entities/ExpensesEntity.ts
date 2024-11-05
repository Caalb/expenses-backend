import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("expenses")
export class ExpensesEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  description!: string;

  @Column({ type: "date" })
  date!: Date;

  @Column()
  userId!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  value!: number;
}
