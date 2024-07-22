import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransactionAggregatorModule } from "@/transaction-aggregator/transaction-aggregator.module.js";

import { TransactionEntity } from "./transaction-importer.entity.js";
import { TransactionImporterService } from "./transaction-importer.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    TransactionAggregatorModule,
  ],
  providers: [TransactionImporterService],
})
export class TransactionImporterModule {}
