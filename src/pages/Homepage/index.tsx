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
import { useWebSocket } from "@/src/hooks/webSocketProvider";

interface StockProps {
    symbol: string;
}

const Stock: React.FC<StockProps> = ({ symbol }) => {
    const { data: stockData } = useWebSocket();

    console.log("data", stockData);

    return (
        <></>
    );
};

export default Stock;
