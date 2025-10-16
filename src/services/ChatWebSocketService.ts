import {
  WebSocketMessage,
  TextMessage,
  ControlMessage,
  ConnectionStatus,
  ErrorCode,
} from '../types/chat.types';

export interface ChatWebSocketConfig {
  host: string;
  port: number;
  userName: string;
  onMessage: (message: WebSocketMessage) => void;
  onConnectionChange: (status: ConnectionStatus) => void;
  onError: (error: Error) => void;
}

export class ChatWebSocketService {
  private ws: WebSocket | null = null;
  private config: ChatWebSocketConfig;
  private pingInterval: NodeJS.Timeout | null = null;
  private pongTimeout: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private messageQueue: string[] = [];
  private lastMessageTimestamps: number[] = [];
  private readonly RATE_LIMIT_WINDOW = 2000; // 2 seconds
  private readonly MAX_MESSAGES_PER_WINDOW = 5;

  constructor(config: ChatWebSocketConfig) {
    this.config = config;
  }

  /**
   * Connect to the WebSocket server
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('[ChatWS] Already connected');
      return;
    }

    const url = `wss://${this.config.host}:${
      this.config.port
    }/realtime?userName=${encodeURIComponent(this.config.userName)}`;
    console.log('[ChatWS] Connecting to:', url);

    this.config.onConnectionChange('connecting');

    try {
      this.ws = new WebSocket(url);
      this.setupEventHandlers();
    } catch (error) {
      console.error('[ChatWS] Connection error:', error);
      this.config.onConnectionChange('error');
      this.config.onError(error as Error);
      this.scheduleReconnect();
    }
  }

  /**
   * Disconnect from the WebSocket server
   */
  disconnect(): void {
    console.log('[ChatWS] Disconnecting...');
    this.clearHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.config.onConnectionChange('disconnected');
    this.reconnectAttempts = 0;
  }

  /**
   * Send a text message
   */
  sendText(text: string, outputMode: 'text' | 'audio' = 'text'): boolean {
    if (!this.isConnected()) {
      console.error('[ChatWS] Cannot send - not connected');
      return false;
    }

    // Check rate limiting
    if (!this.checkRateLimit()) {
      console.warn('[ChatWS] Rate limited - please slow down');
      this.config.onError(new Error('Rate limited. Please wait a moment.'));
      return false;
    }

    const message: TextMessage = {
      type: 'text',
      id: this.generateUUID(),
      timestamp: Date.now(),
      payload: {
        text,
        output: outputMode,
      },
    };

    return this.send(message);
  }

  /**
   * Send a control message (ping/pong)
   */
  private sendControl(event: 'ping' | 'pong'): boolean {
    const message: ControlMessage = {
      type: 'control',
      id: this.generateUUID(),
      timestamp: Date.now(),
      event,
    };

    return this.send(message);
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Setup WebSocket event handlers
   */
  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('[ChatWS] Connected successfully');
      this.config.onConnectionChange('connected');
      this.reconnectAttempts = 0;
      this.startHeartbeat();
      this.flushMessageQueue();
    };

    this.ws.onmessage = event => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        console.log('[ChatWS] Received:', message.type, message);

        // Handle ping
        if (
          message.type === 'control' &&
          (message as ControlMessage).event === 'ping'
        ) {
          this.handlePing();
          return;
        }

        // Handle pong
        if (
          message.type === 'control' &&
          (message as ControlMessage).event === 'pong'
        ) {
          this.handlePong();
          return;
        }

        // Forward to handler
        this.config.onMessage(message);
      } catch (error) {
        console.error('[ChatWS] Failed to parse message:', error);
        this.config.onError(new Error('Invalid message format'));
      }
    };

    this.ws.onerror = error => {
      console.error('[ChatWS] WebSocket error:', error);
      this.config.onConnectionChange('error');
      this.config.onError(new Error('WebSocket connection error'));
    };

    this.ws.onclose = event => {
      console.log('[ChatWS] Connection closed:', event.code, event.reason);
      this.clearHeartbeat();
      this.config.onConnectionChange('disconnected');

      // Attempt reconnection if not a clean close
      if (
        event.code !== 1000 &&
        this.reconnectAttempts < this.maxReconnectAttempts
      ) {
        this.scheduleReconnect();
      }
    };
  }

  /**
   * Send a message
   */
  private send(message: WebSocketMessage): boolean {
    try {
      const data = JSON.stringify(message);

      if (this.isConnected()) {
        this.ws?.send(data);
        console.log('[ChatWS] Sent:', message.type);
        return true;
      } else {
        console.log('[ChatWS] Queuing message (not connected)');
        this.messageQueue.push(data);
        return false;
      }
    } catch (error) {
      console.error('[ChatWS] Failed to send message:', error);
      this.config.onError(error as Error);
      return false;
    }
  }

  /**
   * Flush queued messages
   */
  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0 && this.isConnected()) {
      const data = this.messageQueue.shift();
      if (data) {
        this.ws?.send(data);
        console.log('[ChatWS] Sent queued message');
      }
    }
  }

  /**
   * Start heartbeat mechanism
   */
  private startHeartbeat(): void {
    this.clearHeartbeat();

    // Server sends ping every 20s, we respond with pong
    // We can also send our own pings to detect disconnects faster
    this.pingInterval = setInterval(() => {
      if (this.isConnected()) {
        // Optional: send our own ping to detect connection issues
        console.log('[ChatWS] Sending heartbeat ping');
      }
    }, 20000);
  }

  /**
   * Clear heartbeat timers
   */
  private clearHeartbeat(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    if (this.pongTimeout) {
      clearTimeout(this.pongTimeout);
      this.pongTimeout = null;
    }
  }

  /**
   * Handle incoming ping from server
   */
  private handlePing(): void {
    console.log('[ChatWS] Received ping, sending pong');
    this.sendControl('pong');
  }

  /**
   * Handle incoming pong from server
   */
  private handlePong(): void {
    console.log('[ChatWS] Received pong');
    if (this.pongTimeout) {
      clearTimeout(this.pongTimeout);
      this.pongTimeout = null;
    }
  }

  /**
   * Schedule reconnection attempt
   */
  private scheduleReconnect(): void {
    this.reconnectAttempts++;
    console.log(
      `[ChatWS] Scheduling reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`,
    );

    setTimeout(() => {
      if (this.reconnectAttempts <= this.maxReconnectAttempts) {
        this.connect();
      } else {
        console.error('[ChatWS] Max reconnection attempts reached');
        this.config.onError(
          new Error('Failed to reconnect after multiple attempts'),
        );
      }
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  /**
   * Check rate limiting (5 messages per 2 seconds)
   */
  private checkRateLimit(): boolean {
    const now = Date.now();
    const windowStart = now - this.RATE_LIMIT_WINDOW;

    // Remove timestamps outside the window
    this.lastMessageTimestamps = this.lastMessageTimestamps.filter(
      timestamp => timestamp > windowStart,
    );

    // Check if we've exceeded the limit
    if (this.lastMessageTimestamps.length >= this.MAX_MESSAGES_PER_WINDOW) {
      return false;
    }

    // Add current timestamp
    this.lastMessageTimestamps.push(now);
    return true;
  }

  /**
   * Generate UUID v4
   */
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
