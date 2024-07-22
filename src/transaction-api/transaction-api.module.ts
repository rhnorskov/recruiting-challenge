import { Module } from "@nestjs/common";

import { TransactionAggregatorModule } from "@/transaction-aggregator/transaction-aggregator.module.js";

import { TransactionApiController } from "./transaction-api.controller.js";
import { TransactionApiService } from "./transaction-api.service.js";

@Module({
  imports: [TransactionAggregatorModule],
  providers: [TransactionApiService],
  controllers: [TransactionApiController],
})
export class TransactionApiModule {}
