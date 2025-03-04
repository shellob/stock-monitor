import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { HttpExceptionFilter } from './http-exception.filter';
//import { RedisService } from './redice.service';

@Module({
  providers: [LoggerService, HttpExceptionFilter/*, RedisService*/],
exports: [LoggerService, HttpExceptionFilter, /*RedisService*/],
})
export class CommonModule {}
