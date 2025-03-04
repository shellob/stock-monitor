export class StockResponseDto {
    symbol: string;          // Символ акции
    currentPrice: number;    // Текущая цена
    change: number;          // Изменение цены за день
    changePercent: number;   // Изменение в процентах
    open: number;            // Цена открытия
    high: number;            // Максимальная цена дня
    low: number;             // Минимальная цена дня
    prevClose: number;       // Цена закрытия предыдущего дня
  }
  