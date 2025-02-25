import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { User } from "./userEntities";

@Entity("banker")
export class Banker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar",length:20 })
  name!: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: "banks_users",
    joinColumn: {
      name: "bankerId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  users?: User[];
}
