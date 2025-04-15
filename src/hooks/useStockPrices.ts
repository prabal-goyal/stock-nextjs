'use client';
import { useEffect, useState } from 'react';
import socketManager from '../utils/WebSocketManager';

type StockData = {
  symbol: string;
  price: number;
  volume: number;
};

export function useStockPrices(symbols: string[]) {
  const [stockData, setStockData] = useState<Record<string, StockData>>({});

  useEffect(() => {
    if (symbols.length === 0) return;

    const unsubscribe = socketManager.subscribe((data) => {
      if (!symbols.includes(data.symbol)) return;

      // console.log(`Updating state for ${data.symbol}`);
       

      setStockData((prev) => ({
        ...prev,
        [data.symbol]: data,
      }));
    });

    symbols.forEach((symbol) => {
      socketManager.send({ type: 'subscribe', symbol });
    });

    return () => {
      symbols.forEach((symbol) => {
        socketManager.send({ type: 'unsubscribe', symbol });
      });
      unsubscribe();
    };
  }, [symbols]);

  return stockData;
}
