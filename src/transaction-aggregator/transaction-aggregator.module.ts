import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  AggregatedPayoutRequests,
  AggregatedTransactionData,
} from "./transaction-aggregator.entities.js";
import { TransactionAggregatorService } from "./transaction-aggregator.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AggregatedPayoutRequests,
      AggregatedTransactionData,
    ]),
  ],
  providers: [TransactionAggregatorService],
  exports: [TransactionAggregatorService],
})
export class TransactionAggregatorModule {}
