"use client"; // Important in Next.js 15
import { useFinhubWebSocket } from "@/src/hooks/useFinhubbWebsocket";
import StockCard from "@/src/pages/components/StockCard"; // Import the StockCard component

interface WishlistPageProps {
    readonly symbols: string[];
}

export default function WishlistPage({ symbols }: WishlistPageProps) {
    const data = useFinhubWebSocket(symbols);
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 p-6 bg-white dark:bg-gray-900">
            {symbols?.map((symbol, index) => {
                const stockData = data[symbol] || { price: null, volume: null };
                return (
                    <StockCard
                        key={index}
                        name={symbol}
                        symbol={symbol}
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
    );
}
