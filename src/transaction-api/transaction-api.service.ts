import { Injectable } from "@nestjs/common";

import { TransactionAggregatorService } from "@/transaction-aggregator/transaction-aggregator.service.js";

@Injectable()
export class TransactionApiService {
  constructor(
    private readonly transactionAggregatorService: TransactionAggregatorService,
  ) {}

  public getAggregatedData(id: string) {
    return this.transactionAggregatorService.getAggregatedData(id);
  }

  public getPayoutRequests() {
    return this.transactionAggregatorService.getPayoutRequests();
  }
}
