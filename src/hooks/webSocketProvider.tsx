"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface WebSocketContextType {
    data: Record<string, { price: number | null; volume: number | null }>;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
const FINNHUB_SOCKET_URL = `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`;
const FALSESTREET_SOCKET_URL = `wss://falsestreetsocket.onrender.com/ws`;

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Record<string, { price: number | null; volume: number | null }>>({});
    const [ws, setWs] = useState<WebSocket | null>(null);
    const symbols = ["AAPL", "GOOGL", "MSFT"]; // Replace with your actual symbols

    useEffect(() => {
        const socket = new WebSocket(FALSESTREET_SOCKET_URL);

        socket.onopen = () => {
            console.log("WebSocket connected");
            setWs(socket);
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "trade") {
                setData((prevData) => ({
                    ...prevData,
                    [message.symbol]: { price: message.price, volume: message.volume },
                }));
            }
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected, attempting to reconnect.");
            setTimeout(() => setWs(new WebSocket(FALSESTREET_SOCKET_URL)), 3000);
        };

        return () => socket.close();
    }, []);

    useEffect(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "subscribe", symbols }));
        } else {
            console.warn("WebSocket not ready, delaying message sending...");
            const interval = setInterval(() => {
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: "subscribe", symbols }));
                    clearInterval(interval);
                }
            }, 1000); // Check every second until the WebSocket is open
        }
    }, [ws]);

    return <WebSocketContext.Provider value={{ data }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) throw new Error("useWebSocket must be used within a WebSocketProvider");
    return context;
};
