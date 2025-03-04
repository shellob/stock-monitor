import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Получение данных по одной акции
export const getStockData = async (symbol: string) => {
  try {
    const response = await axios.get(`${API_URL}/stocks/${symbol}`);
    return response.data;
  } catch (error) {
    console.error(` Ошибка при загрузке ${symbol}:`, error);
    return null;
  }
};

export const getStocksList = async (symbols: string[]) => {
  try {
    const responses = await Promise.all(
      symbols.map((symbol) =>
        axios.get(`${API_URL}/stocks/${symbol}`).then((res) => res.data)
      )
    );
    return responses;
  } catch (error) {
    console.error(" Ошибка загрузки акций:", error);
    return [];
  }
};

export const getAllStocks = async () => {
  try {
    const response = await axios.get(`${API_URL}/stocks`);
    return response.data; // Ожидаем массив объектов с символами и ценами
  } catch (error) {
    console.error(" Ошибка при загрузке списка всех акций:", error);
    return [];
  }

};
export async function getStockHistory(symbol: string) {
  try {
    const response = await axios.get(`${API_URL}/history/${symbol}`);
    return response.data;
  } catch (error) {
    console.error(" Ошибка загрузки истории цен:", error);
    return null;
  }
};