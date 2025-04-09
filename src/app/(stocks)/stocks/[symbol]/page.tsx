import React from "react";
import Stock from "@/src/pages/Stock";

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

export default async function StockPage({
  params,
}: {
  readonly params: Promise<{ symbol: string }>
}) {
  const { symbol } = await params;

  // Fetch historical candlestick data (last 1 hour)
  const now = Math.floor(Date.now() / 1000);
  const from = now - 3600; // 1 hour ago
  const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=${from}&to=${now}&token=${FINNHUB_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  // Pass symbol and fetched data to Stock component
  return <Stock symbol={symbol} initialData={data} />;
}
