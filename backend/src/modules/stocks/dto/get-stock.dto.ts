import {IsString} from 'class-validator';

export class GetStockDto {
  @IsString()
  symbol: string;
}
