import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersEntity } from "./UsersEntity";

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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at!: Date;

  @ManyToOne(() => UsersEntity, (user) => user.expenses)
  user!: UsersEntity;
}
