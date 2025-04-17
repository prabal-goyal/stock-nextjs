type StockData = {
  symbol: string;
  price: number;
  volume: number;
};

type MessageHandler = (data: StockData) => void;

class WebSocketManager {
  private socket: WebSocket | null = null;
  private readonly handlers: Set<MessageHandler> = new Set();
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private readonly SOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URI;
  private readonly RECONNECT_DELAY = 3000;
  private readonly broadcastChannel: BroadcastChannel;

  constructor() {
    this.broadcastChannel = new BroadcastChannel('stock_updates');
    this.broadcastChannel.onmessage = (event) => {
      // console.log('Broadcast message received', event.data);
       
      this.dispatchMessage(event.data);
    };

    this.connect();
  }

  private connect() {
    if (!this.SOCKET_URL) {
      throw new Error('SOCKET_URL is not defined');
    }
    this.socket = new WebSocket(this.SOCKET_URL);

    this.socket.addEventListener('open', () => {
      console.log('WebSocket connected');
       
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      // console.log('WebSocket message received', data);
       

      if (data.type === 'trade') {
        const stockUpdates: StockData[] = data.data.map((trade: any) => ({
          symbol: trade.s,
          price: trade.p,
          volume: trade.v,
        }));

        stockUpdates.forEach((update) => {
          this.broadcastChannel.postMessage(update);
          this.dispatchMessage(update);
        });
      }
    });

    this.socket.addEventListener('close', () => {
      console.warn('WebSocket disconnected');
       
      this.reconnect();
    });

    this.socket.addEventListener('error', (error) => {
      console.error('WebSocket error', error);
       
      this.socket?.close();
    });
  }

  private reconnect() {
    if (this.reconnectTimeout) return;
    console.log(`Reconnecting in ${this.RECONNECT_DELAY}ms...`);
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null;
      this.connect();
    }, this.RECONNECT_DELAY);
  }

  subscribe(handler: MessageHandler) {
    this.handlers.add(handler);
    return () => this.unsubscribe(handler);
  }

  private unsubscribe(handler: MessageHandler) {
    this.handlers.delete(handler);
  }

  private dispatchMessage(data: StockData) {
    this.handlers.forEach((handler) => {
      handler(data);
    });
  }

  send(message: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      // console.log('Sending message to WebSocket', message);
       
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('Socket not open, message not sent.');
       
    }
  }
}

const socketManager = new WebSocketManager();
export default socketManager;
