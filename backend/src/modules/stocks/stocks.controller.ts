import { Controller, Get, Param, Query } from '@nestjs/common';
import { StockService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StockService) {}

  @Get(':symbol')
  async getStock(@Param('symbol') symbol: string) {
    return this.stockService.getStock(symbol.toUpperCase());
  }

  @Get(':symbol/history')
  async getStockHistory(
    @Param('symbol') symbol: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('resolution') resolution = "D"
  ) {
    return this.stockService.getStockHistory(symbol.toUpperCase(), Number(from), Number(to), resolution);
  }

}
