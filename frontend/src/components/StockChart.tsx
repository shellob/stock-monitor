"use client";

import { useState } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const STOCK_SYMBOLS = [
  "AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NFLX", "NVDA", "AMD", "INTC", "META",
  "BA", "DIS", "BABA", "V", "MA", "PYPL", "ADBE", "CRM", "CSCO", "PFE"
];

export default function StockChart() {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL"); 

  return (
    <div className="bg-[#1A3B4F] p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-[#38B68D] text-center">📈 График акций</h2>

      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Введите символ акции (например, AAPL)"
          className="w-80 p-2 text-white bg-[#1A3B4F] border border-[#38B68D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#38B68D]"
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
          list="stock-options"
        />
        <datalist id="stock-options">
          {STOCK_SYMBOLS.map((symbol) => (
            <option key={symbol} value={symbol} />
          ))}
        </datalist>
      </div>

      <div className="w-full h-[500px] mt-4">
        <AdvancedRealTimeChart
          symbol={`NASDAQ:${selectedSymbol}`} 
          theme="dark"
          autosize
        />
      </div>
    </div>
  );
}
