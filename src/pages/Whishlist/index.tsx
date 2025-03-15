"use client";
import { categories } from "@/src/data/categories";
import { useFinhubWebSocket } from "@/src/hooks/useFinhubbWebsocket";
import StockCard from "@/src/pages/components/StockCard";
import { useMemo, useState } from "react";
import Category from "../components/Category";

export default function WishlistPage() {
    const symbols = categories?.map((category) => category.symbol);
    const data = useFinhubWebSocket(symbols); // Ensure this hook is uncommented to fetch real-time data
    const categoryArray = useMemo(() => {
        const uniqueCategories = new Set(categories?.map((category) => category?.category));
        return Array.from(uniqueCategories);
    }, [categories]);
    const [activeCategory, setActiveCategory] = useState<string | null>(categoryArray[0]);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category === activeCategory ? null : category);
    };

    // Filter stocks based on the active category
    const filteredStocks = useMemo(() => {
        return activeCategory
            ? categories.filter((stock) => stock.category === activeCategory)
            : categories;
    }, [activeCategory, categories]);

    return (
        <div className="p-6 bg-white dark:bg-gray-900">
            {/* Category Selection */}
            <Category
                categories={categoryArray}
                activeCategory={activeCategory}
                onCategorySelect={handleCategoryChange}
            />
            {/* Stock Cards */}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                {filteredStocks.map((stock) => {
                    const stockData = data[stock.symbol] || { price: null, volume: null };
                    return (
                        <StockCard
                            key={stock.id}
                            name={stock.name}
                            symbol={stock.symbol}
                            currentPrice={stockData.price ?? 0}
                            priceChange={Math.random() * 10 - 5} // Simulated change
                            percentageChange={Math.random() * 2 - 1} // Simulated percentage
                            marketStatus="Open" // Placeholder, replace with actual status
                            high={stockData.price ? stockData.price * 1.05 : 0} // Simulated high
                            low={stockData.price ? stockData.price * 0.95 : 0} // Simulated low
                            volume={stockData.volume ?? 0}
                        />
                    );
                })}
            </div>
        </div>
    );
}
