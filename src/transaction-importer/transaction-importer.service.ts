import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TransactionAggregatorService } from "@/transaction-aggregator/transaction-aggregator.service.js";

import { TransactionEntity } from "./transaction-importer.entity.js";
import {
  TransactionApiItem,
  TransactionApiResponse,
} from "./transaction-importer.types.js";

@Injectable()
export class TransactionImporterService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly transactionAggregatorService: TransactionAggregatorService,
  ) {}

  @Cron("* * * * *")
  async importTransactions() {
    console.log("Importing transactions...");

    const fetchedTransactions = await this.fetchTransactions();

    const savedTransactions = await this.transactionRepository.save(
      fetchedTransactions.items.map((transaction) =>
        this.parseTransaction(transaction),
      ),
    );

    console.log("Transactions imported.");

    console.log("Aggregating transactions...");

    await this.transactionAggregatorService.aggregateTransactions(
      savedTransactions,
    );

    console.log("Transactions aggregated.");
  }

  private parseTransaction(transaction: TransactionApiItem): TransactionEntity {
    return this.transactionRepository.create({
      id: transaction.id,
      userId: transaction.userId,
      type: transaction.type,
      amount: transaction.amount,
      createdAt: new Date(transaction.createdAt),
    });
  }

  private fetchTransactions(): Promise<TransactionApiResponse> {
    return Promise.resolve({
      items: [
        {
          id: "41bbdf81-735c-4aea-beb3-3e5f433a30c5",
          userId: "074092",
          createdAt: "2023-03-16T12:33:11.000Z",
          type: "payout",
          amount: 30,
        },
        {
          id: "f2633b9b-ccfe-4077-b560-e9f682f822cd",
          userId: "074092",
          createdAt: "2023-03-12T12:33:11.000Z",
          type: "spent",
          amount: 12,
        },
        {
          id: "ae2651a5-d3cc-4b9a-858e-b22549c26b66",
          userId: "074092",
          createdAt: "2023-03-15T12:33:11.000Z",
          type: "earned",
          amount: 1.2,
        },
      ],
      meta: {
        totalItems: 1200,
        itemCount: 3,
        itemsPerPage: 3,
        totalPages: 400,
        currentPage: 1,
      },
    });
  }
}
