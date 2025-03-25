"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StockCardProps {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange: number;
  percentageChange: number;
  high: number;
  low: number;
  volume: number;
  marketStatus: "Open" | "Closed";
}

const StockCard: React.FC<StockCardProps> = ({
  name,
  symbol,
  currentPrice,
  priceChange,
  percentageChange,
  high,
  low,
  volume,
  marketStatus,
}) => {
  const isPositive = priceChange >= 0;

  return (
    <Card className="w-full max-w-md p-4 bg-white shadow-lg rounded-xl dark:bg-gray-900 transition-all duration-300">
      <CardContent>
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{name} ({symbol})</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Market: {marketStatus}</p>
          </div>
          <div
            className={`flex items-center gap-1 text-lg font-bold ${isPositive ? "text-green-500" : "text-red-500"
              }`}
          >
            {isPositive ? <ArrowUpRight /> : <ArrowDownRight />}
            <span>${currentPrice?.toFixed(2)}</span>
          </div>
        </div>

        {/* Price Change Info */}
        <div className="mt-2">
          <p className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {/* {isPositive ? "+" : "-"}${Math.abs(priceChange)?.toFixed(2)} ({Math.abs(percentageChange)?.toFixed(2)}%) */}
          </p>
        </div>

        {/* Stock Details */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
          <p>📈 High: <span className="font-semibold">${high?.toFixed(2)}</span></p>
          <p>📉 Low: <span className="font-semibold">${low?.toFixed(2)}</span></p>
          <p>📊 Volume: <span className="font-semibold">{volume?.toLocaleString()}</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
