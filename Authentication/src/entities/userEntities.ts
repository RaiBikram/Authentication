import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
  // ManyToMany,
} from "typeorm";
// import { Transactions } from "./Transaction";
// import { Banker } from "./Banker";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  profilePicture?: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  resetPasswordToken?: number | null;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  resetPasswordExpiresAt?: Date | null;

  @Column({
    type: "varchar",
    length: 6,
    nullable: true,
  })
  verificationToken?: number | null;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  verificationTokenExpiresAt?: Date | null;

  @Column({
    type: "boolean",
    default: false,
  })
  isVerified!: boolean;

  // @Column({
  //   type: "boolean",
  //   default: false,
  // })
  // isActive!: boolean;

  // @Column({
  //   type: "timestamp",
  //   nullable: true,
  // })
  // lastLoginAt?: Date;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt!: Date;
}
/*
  // One-to-Many Relationship: A user can have multiple transactions
  @OneToMany(() => Transactions, (transaction) => transaction.user)
  transactions?: Transactions[];

  // Many-to-Many Relationship: A user can be linked to multiple bankers
  @ManyToMany(() => Banker, (banker) => banker.users)
  bankers?: Banker[];

  Profile picture stored as a string (URL or base64)


  */
