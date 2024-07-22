import { Controller, Get, Param } from "@nestjs/common";

import { TransactionApiService } from "./transaction-api.service.js";

@Controller("transactions")
export class TransactionApiController {
  constructor(private readonly transactionApiService: TransactionApiService) {}

  @Get("aggregated-data/:id")
  getAggregatedData(@Param("id") id: string) {
    return this.transactionApiService.getAggregatedData(id);
  }

  @Get("payout-requests")
  getPayoutRequests() {
    return this.transactionApiService.getPayoutRequests();
  }
}
