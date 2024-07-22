import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("aggregated_transaction_data")
export class AggregatedTransactionData {
  @PrimaryColumn()
  userId!: string;

  @Column()
  balance!: number;

  @Column()
  earned!: number;

  @Column()
  spent!: number;

  @Column()
  payout!: number;
}

@Entity("aggregated_payout_requests")
export class AggregatedPayoutRequests {
  @PrimaryColumn()
  userId!: string;

  @Column()
  payoutAmount!: number;
}
