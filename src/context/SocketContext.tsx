'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWebSocketManager, StockData, WebSocketManager } from '../utils/WebSocketManager';

interface SocketContextType {
  /** Subscribe to updates for an array of symbols. Returns a subscription ID for unsubscription. */
  subscribe: (symbols: string[], callback: (data: StockData) => void) => number;
  /** Unsubscribe by subscription ID */
  unsubscribe: (subscriptionId: number) => void;
  /** Send a generic message over the WebSocket */
  sendMessage: (msg: unknown) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [manager, setManager] = useState<WebSocketManager | null>(null);

  useEffect(() => {
    const mgr = getWebSocketManager();
    setManager(mgr);
    // Optionally, you could add cleanup logic here if the manager should shut down
    return () => {
      // Leave open if you want the connection to persist across page navigations.
      // mgr.close();
    };
  }, []);

  const subscribe = (symbols: string[], callback: (data: StockData) => void): number => {
    if (!manager) {
      throw new Error('WebSocket manager is not available');
    }
    return manager.subscribe(symbols, callback);
  };

  const unsubscribe = (subscriptionId: number) => {
    if (!manager) return;
    manager.unsubscribe(subscriptionId);
  };

  const sendMessage = (msg: unknown) => {
    if (!manager) return;
    manager.sendMessage(msg);
  };

  return (
    <SocketContext.Provider value={{ subscribe, unsubscribe, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
