"use client";

import { useState, useEffect } from "react";
import { getStocksList } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const STOCK_SYMBOLS = [
  "AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NFLX", "NVDA", "AMD", "INTC", "META",
  "BA", "DIS", "BABA", "V", "MA", "PYPL", "ADBE", "CRM", "CSCO", "PFE"
];

export default function StockTable() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [isUpdating, setIsUpdating] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await getStocksList(STOCK_SYMBOLS);
      setStocks(data.filter(Boolean));
    } catch (error) {
      console.error("Ошибка загрузки списка акций:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    if (isUpdating) {
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [isUpdating]);

  // Фильтрация по символу
  const searchedStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Фильтрация по росту/падению
  const filteredStocks = searchedStocks.filter((stock) => {
    if (filter === "all") return true;
    if (filter === "up") return stock.currentPrice > stock.open;
    if (filter === "down") return stock.currentPrice < stock.open;
    return true;
  });

  return (
    <div className="bg-[#0F2C3F] text-white p-8 rounded-lg shadow-xl transition-all">
      {/* 🔥 Заголовок */}
      <h1 className="text-4xl font-extrabold text-center text-[#38B68D] mb-2">
        Peter Partner Test Task
      </h1>
      <h2 className="text-2xl font-bold mb-4 text-center text-[#38B68D]">
        📊 Биржевой монитор
      </h2>

      <input
        type="text"
        placeholder="🔍 Поиск по символу (например, AAPL)"
        className="w-full p-3 mb-4 bg-[#1A3B4F] text-white border border-[#38B68D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#38B68D] transition-all"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex justify-center gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-lg transition-all font-medium ${
            filter === "all" ? "bg-[#38B68D] scale-105 shadow-md" : "bg-[#1A3B4F] hover:bg-[#38B68D]"
          }`}
          onClick={() => setFilter("all")}
        >
          Все
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-all font-medium ${
            filter === "up" ? "bg-green-500 scale-105 shadow-md" : "bg-[#1A3B4F] hover:bg-green-600"
          }`}
          onClick={() => setFilter("up")}
        >
          🔼 Растущие
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-all font-medium ${
            filter === "down" ? "bg-red-500 scale-105 shadow-md" : "bg-[#1A3B4F] hover:bg-red-600"
          }`}
          onClick={() => setFilter("down")}
        >
          🔽 Падающие
        </button>
      </div>

      <button
        className="w-full px-4 py-2 mb-4 rounded-lg text-white font-semibold transition-all"
        onClick={() => setIsUpdating(!isUpdating)}
        style={{
          backgroundColor: isUpdating ? "#F87171" : "#38B68D",
        }}
      >
        {isUpdating ? "⏸ Остановить обновление" : "▶ Возобновить обновление"}
      </button>

      {loading ? (
        <p className="text-gray-400 text-center animate-pulse">⏳ Загружаем данные...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#38B68D] text-lg">
              <th className="p-3 font-medium">Символ</th>
              <th className="p-3 font-medium">Текущая цена ($)</th>
              <th className="p-3 font-medium">Изменение ($)</th>
              <th className="p-3 font-medium">%</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <motion.tr
                    key={stock.symbol}
                    className="border-b border-[#1A3B4F] hover:bg-[#1A3B4F] transition-all"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="p-3 font-bold">{stock.symbol}</td>
                    <motion.td
                      className="p-3 text-lg font-semibold"
                      animate={{ color: stock.currentPrice > stock.open ? "#38B68D" : "#F87171" }}
                    >
                      ${stock.currentPrice.toFixed(2)}
                    </motion.td>
                    <motion.td
                      className={`p-3 text-lg ${
                        stock.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                      animate={{ opacity: [0.5, 1], scale: [0.9, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      {stock.change.toFixed(2)}
                    </motion.td>
                    <motion.td
                      className={`p-3 text-lg ${
                        stock.changePercent >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                      animate={{ opacity: [0.5, 1], scale: [0.9, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      {stock.changePercent.toFixed(2)}%
                    </motion.td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    ❌ Ничего не найдено
                  </td>
                </tr>
              )}
            </tbody>
          </AnimatePresence>
        </table>
      )}
    </div>
  );
}
