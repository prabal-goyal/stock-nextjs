'use client';

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useStockPrices } from "@/src/hooks/useStockPrices";
import StockCategory from "../components/StockCategory";
import { groupedSymbols } from "@/src/data/categories";


export default function StockComponent() {
  const allSymbols = Object.values(groupedSymbols).flat();
  const stockData = useStockPrices(allSymbols);
  const [activeTab, setActiveTab] = useState("Technology");

  return (
    <div className="p-6 md:px-16 max-w-screen-xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap gap-2 justify-start mb-6">
          {Object.keys(groupedSymbols).map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedSymbols).map(([category, symbols]) => {
          const stocks = symbols
            .map(symbol => ({
              symbol,
              price: stockData[symbol]?.price ?? 0,
              volume: stockData[symbol]?.volume ?? 0,
            }))
            .filter(stock => stock.price > 0);

          return (
            <TabsContent key={category} value={category}>
              {stocks.length > 0 ? (
                <StockCategory stocks={stocks} />
              ) : (
                <p className="text-gray-500 text-center py-10">Loading stock data...</p>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
