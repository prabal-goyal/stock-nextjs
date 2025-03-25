"use client";
import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

interface StockProps {
    symbol: string;
    initialData: any[]; // Preloaded chart data
}

const Stock: React.FC<StockProps> = ({ symbol, initialData }) => {
    const [data, setData] = useState<any[]>(initialData || []);
    const [latestPrice, setLatestPrice] = useState<number | null>(
        initialData?.length ? initialData[initialData.length - 1].close : null
    );
    const [prevPrice, setPrevPrice] = useState<number | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);
        setSocket(ws);

        ws.onopen = () => {
            console.log("WebSocket connected ✅");
            ws.send(JSON.stringify({ type: "subscribe", symbol }));
        };

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log("WebSocket Data:", response);

            if (response.type === "trade") {
                const trade = response.data[0]; // Latest trade data
                setPrevPrice(latestPrice);
                setLatestPrice(trade.p);

                setData((prev) => {
                    const updatedData = [
                        ...(Array.isArray(prev) ? prev.slice(-100) : []), // Ensure prev is an array
                        {
                            time: new Date().toLocaleTimeString(),
                            open: trade.p,
                            high: trade.p,
                            low: trade.p,
                            close: trade.p,
                        },
                    ];
                    return updatedData;
                });

            }
        };

        ws.onerror = (error) => console.error("WebSocket Error: ", error);
        ws.onclose = () => console.log("WebSocket disconnected ❌");

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: "unsubscribe", symbol }));
            }
            ws.close();
        };
    }, [symbol, latestPrice]);

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg w-full">
            <h1 className="text-2xl font-bold mb-2">{symbol} Live Candlestick Chart</h1>
            {latestPrice && (
                <p
                    className={`text-lg font-semibold mb-4 ${latestPrice > (prevPrice || 0) ? "text-green-400" : "text-red-400"
                        }`}
                >
                    Latest Price: ${latestPrice.toFixed(2)}
                </p>
            )}

            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={500}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#d1d5db" />
                        <YAxis stroke="#d1d5db" domain={["auto", "auto"]} />
                        <Tooltip contentStyle={{ backgroundColor: "#111827", borderRadius: "5px" }} />

                        <Area
                            type="monotone"
                            dataKey="close"
                            stroke="#34d399"
                            fillOpacity={1}
                            fill="url(#colorClose)"
                            strokeWidth={2}
                            dot={{ stroke: "white", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-center text-gray-400">Loading chart data...</p>
            )}
        </div>
    );
};

export default Stock;
