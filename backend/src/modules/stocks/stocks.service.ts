import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StockService {
  private readonly API_KEY = process.env.FINNHUB_API_KEY;
  private readonly API_URL = 'https://finnhub.io/api/v1/quote';

  async getStock(symbol: string) {
    try {
      const { data } = await axios.get(`${this.API_URL}`, {
        params: { symbol, token: this.API_KEY },
      });
      return {
        symbol,
        currentPrice: data.c,  // Текущая цена
        change: data.d,  // Изменение в $
        changePercent: data.dp,  // Изменение в %
        open: data.o,  // Цена открытия
        high: data.h,  // Максимум
        low: data.l,  // Минимум
        prevClose: data.pc,  // Предыдущая закрытая цена
      };
    } catch (error) {
      console.error(`Ошибка при загрузке данных для ${symbol}:`, error);
      return null;
    }
  }

  async getStockHistory(symbol: string, from: number, to: number, resolution: string = "D") {
    try {
      const { data } = await axios.get(`https://finnhub.io/api/v1/stock/candle`, {
        params: { symbol, resolution, from, to, token: this.API_KEY },
      });
  
      if (data.s !== "ok") {
        throw new Error("No data available");
      }
  
      return {
        symbol,
        timestamps: data.t,
        open: data.o,
        high: data.h,
        low: data.l,
        close: data.c,
        volume: data.v,
      };
    } catch (error) {
      console.error(`Ошибка при загрузке исторических данных ${symbol}:`, error);
      return null;
    }
  }

}
