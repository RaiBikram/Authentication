import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./userEntities"; 

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

@Entity("transactions") // Defining the table name as "transactions"
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id?: number;

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type?: TransactionType; // ENUM for transaction type (DEPOSIT or WITHDRAW)

  @Column({
    type: "numeric",
  })
  amount!: number; // Transaction amount

  // Many-to-One Relationship: Multiple transactions can belong to one user
  @ManyToOne(() => User, (user) => user.transactions, {
    onDelete: "CASCADE", // If a user is deleted, all their transactions will also be deleted
  })
  @JoinColumn({
    name: "userId", // This column in the "transactions" table will store the user ID
  })
  user!: User;
}
