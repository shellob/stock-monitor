import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StockService } from './stocks.service';
import { StocksGateway } from './stocks.gateway';
//import { RedisService } from '../../common/redice.service';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [StocksController],
providers: [StockService, StocksGateway/*, RedisService*/],
})
export class StocksModule {}
