import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TransactionEntity } from "@/transaction-importer/transaction-importer.entity.js";

import {
  AggregatedPayoutRequests,
  AggregatedTransactionData,
} from "./transaction-aggregator.entities.js";

@Injectable()
export class TransactionAggregatorService {
  constructor(
    @InjectRepository(AggregatedPayoutRequests)
    private readonly aggregatedPayoutRequestsRepository: Repository<AggregatedPayoutRequests>,
    @InjectRepository(AggregatedTransactionData)
    private readonly aggregatedTransactionDataRepository: Repository<AggregatedTransactionData>,
  ) {}

  public async getAggregatedData(userId: string) {
    return this.aggregatedTransactionDataRepository.findOne({
      where: { userId },
    });
  }

  public async getPayoutRequests() {
    return this.aggregatedPayoutRequestsRepository.find();
  }

  public async aggregateTransactions(transactions: TransactionEntity[]) {
    await Promise.all([
      this.aggregatePayoutRequests(transactions),
      this.aggregatedTransactionData(transactions),
    ]);
  }

  private async aggregatePayoutRequests(transactions: TransactionEntity[]) {
    const data = transactions.reduce(
      (data, item) => {
        if (item.type !== "payout") {
          return data;
        }

        const datum = data[item.userId] || {
          userId: item.userId,
          payoutAmount: 0,
        };

        datum.payoutAmount += item.amount;

        return { ...data, [item.userId]: datum };
      },
      {} as Record<string, AggregatedPayoutRequests>,
    );

    return this.aggregatedPayoutRequestsRepository.save(Object.values(data));
  }

  private async aggregatedTransactionData(transactions: TransactionEntity[]) {
    const data = transactions.reduce(
      (data, item) => {
        const datum = data[item.userId] || {
          userId: item.userId,
          balance: 0,
          earned: 0,
          spent: 0,
          payout: 0,
        };

        switch (item.type) {
          case "earned":
            datum.earned += item.amount;
            datum.balance += item.amount;
            break;

          case "spent":
            datum.spent += item.amount;
            datum.balance -= item.amount;
            break;

          case "payout":
            datum.payout += item.amount;
            datum.balance -= item.amount;
            break;
        }
        return { ...data, [item.userId]: datum };
      },
      {} as Record<string, AggregatedTransactionData>,
    );

    return this.aggregatedTransactionDataRepository.save(Object.values(data));
  }
}
