import React from "react";

interface StockCardProps {
  symbol: string;
  price: number;
  volume: number;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, price, volume }) => {
  return (
    <div className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white hover:shadow-md transition duration-200 w-full">
      <h2 className="text-lg font-semibold text-gray-900">{symbol}</h2>
      <p className="text-sm text-gray-600 mt-1">
        Price: <span className="font-medium text-black">${price.toFixed(2)}</span>
      </p>
      <p className="text-sm text-gray-600">
        Volume: <span className="font-medium text-black">{volume.toLocaleString()}</span>
      </p>
    </div>
  );
};

export default StockCard;
