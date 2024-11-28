import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseModel from "./base-model.entity";
import { Customer } from "./customer.entity";

@Entity()
export class Transaction extends BaseModel {
  // constains all the metadata from MPESA
  @Column({ type: "jsonb" })
  transactionMetadata: Record<string, any>;

  @Column({ type: "decimal", precision: 15, scale: 6, default: 0 })
  amount: number;

  @Column()
  transactionId: string;

  @Column()
  originatorConversationId: string;

  @Column()
  conversationId: string;

  @ManyToOne(() => Customer, (customer) => customer.transactions, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({
    name: "companyId",
    referencedColumnName: "id",
  })
  customer: Customer;
}
