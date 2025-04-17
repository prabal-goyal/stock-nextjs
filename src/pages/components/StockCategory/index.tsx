import React from "react";
import StockCard from "../StockCard";

interface StockCategoryProps {
  stocks: {
    symbol: string;
    price: number;
    volume: number;
  }[];
}

const StockCategory: React.FC<StockCategoryProps> = ({ stocks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {stocks?.map(stock => (
        <StockCard
          key={stock.symbol}
          symbol={stock.symbol}
          price={stock.price}
          volume={stock.volume}
        />
      ))}
    </div>
  );
};

export default StockCategory;
