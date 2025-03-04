import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from './modules/stocks/stocs.module';

@Module({
  imports: [ConfigModule.forRoot(), StocksModule],
})
export class AppModule {}
