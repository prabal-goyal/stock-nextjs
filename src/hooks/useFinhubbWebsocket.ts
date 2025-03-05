"use client";
import { useEffect, useState, useRef } from "react";

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const FINNHUB_SOCKET_URL = `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`;

export function useFinhubWebSocket(symbols: string[]) {
  const [data, setData] = useState<Record<string, { price: number | null; volume: number | null }>>({});
  const prevPrices = useRef<Record<string, number | null>>({}); // Store last known prices

  useEffect(() => {
    if (!symbols.length || !FINNHUB_API_KEY) return;

    const socket = new WebSocket(FINNHUB_SOCKET_URL);

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

          // Check if the price is different before updating state
          if (prevPrices.current[symbol] !== price) {
            prevPrices.current[symbol] = price; // Update previous price
            setData((prevData) => ({
              ...prevData,
              [symbol]: { price: price ?? null, volume: volume ?? null },
            }));
          }
        });
      }
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket disconnected");

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        symbols.forEach((symbol) => {
          socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        });
      }
      socket.close();
    };
  }, [symbols]);

  return data;
}
