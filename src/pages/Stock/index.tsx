'use client';

import { useStockPrices } from "@/src/hooks/useStockPrices";

export default function StockComponent() {
  const symbols = ['AAPL', 'GOOGL'];
  const stockData = useStockPrices(symbols);
  console.log('stockData', stockData);

  return (
    <div className="p-4">
      {Object.entries(stockData).map(([symbol, data]) => (
        <div key={symbol} className="mb-2 border p-2 rounded shadow">
          <div className="font-bold">{symbol}</div>
          <div className="text-black">Price: ${data.price}</div>
          <div className="text-black">Volume: {data.volume}</div>
        </div>
      ))}
      <p></p>
    </div>
  );
}
