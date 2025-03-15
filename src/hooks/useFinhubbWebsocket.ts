"use client";
import { useEffect, useState, useRef } from "react";
import { categories } from "../data/categories";

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const FINNHUB_SOCKET_URL = `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`;

// Create a mapping of symbols to their categories
const symbolToCategoryMap = categories?.reduce((map, item) => {
    map[item.symbol] = item.category;
    return map;
}, {} as Record<string, string>);

export function useFinhubWebSocket(symbols: string[]) {
    const [data, setData] = useState<Record<string, { price: number | null; volume: number | null; category: string }>>({});
    const prevPrices = useRef<Record<string, number | null>>({});
    const socketRef = useRef<WebSocket | null>(null); // Store socket reference

    useEffect(() => {
        if (!symbols.length || !FINNHUB_API_KEY) {
            console.warn("No symbols provided or API key missing");
            return;
        }

        const socket = new WebSocket(FINNHUB_SOCKET_URL);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket connected");
            symbols.forEach((symbol) => {
                socket.send(JSON.stringify({ type: "subscribe", symbol }));
            });
        };

        socket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            if (messageData.type === "trade") {
                messageData.data.forEach((trade: { s: string; p: number; v: number }) => {
                    const { s: symbol, p: price, v: volume } = trade;

                    if (prevPrices.current[symbol] !== price) {
                        prevPrices.current[symbol] = price;

                        // Get the category for the symbol
                        const category = symbolToCategoryMap[symbol] || "";

                        setData((prevData) => ({
                            ...prevData,
                            [symbol]: { price: price ?? null, volume: volume ?? null, category },
                        }));
                    }
                });
            }
        };

        socket.onerror = (error) => console.error("WebSocket error:", error);
        socket.onclose = (event) => {
            console.warn("WebSocket disconnected:", event.reason);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                symbols.forEach((symbol) => {
                    socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
                });
                socket.close();
            }
        };
    }, [symbols]);

    return data;
}