import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("transactions")
export class TransactionEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  type!: string;

  @Column()
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
