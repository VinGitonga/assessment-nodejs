import { Column, Entity, OneToMany } from "typeorm";
import BaseModel from "./base-model.entity";
import { Transaction } from "./transaction.entity";

@Entity()
export class Customer extends BaseModel {
  @Column()
  name: string;

  @Column({ unique: true })
  phoneNo: string;

  @Column()
  password: string;

  @Column({ type: "decimal", precision: 15, scale: 6, default: 0 })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.customer, {
    onDelete: "CASCADE",
    nullable: true,
  })
  transactions: Transaction[];
}
