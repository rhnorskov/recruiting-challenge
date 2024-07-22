import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransactionAggregatorModule } from "./transaction-aggregator/transaction-aggregator.module.js";
import { TransactionApiModule } from "./transaction-api/transaction-api.module.js";
import { TransactionImporterModule } from "./transaction-importer/transaction-importer.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    TransactionImporterModule,
    TransactionApiModule,
    TransactionAggregatorModule,
  ],
})
export class AppModule {}
