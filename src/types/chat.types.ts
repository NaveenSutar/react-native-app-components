// Message Types
export type MessageType = 'audio' | 'text' | 'control' | 'event';

export type ControlEvent = 'ping' | 'pong' | 'error' | 'ready' | 'tool_result';

export type EventType =
  | 'response.created'
  | 'response.done'
  | 'response.tool_call';

// Base Message Envelope
export interface BaseMessage {
  type: MessageType;
  id: string;
  timestamp: number;
  payload?: any;
}

// Text Message Payloads
export interface TextPayload {
  text: string;
  role?: 'user' | 'assistant';
  final?: boolean;
  output?: 'text' | 'audio';
  metadata?: Record<string, any>;
}

export interface TextMessage extends BaseMessage {
  type: 'text';
  payload: TextPayload;
}

// Audio Message Payloads
export interface AudioPayload {
  audio: string; // base64-encoded PCM blob
  sequence: number;
}

export interface AudioMessage extends BaseMessage {
  type: 'audio';
  payload: AudioPayload;
}

// Control Message Payloads
export interface ControlErrorPayload {
  code: string;
  message: string;
}

export interface ControlPayload {
  event?: ControlEvent;
  code?: string;
  message?: string;
  function?: string;
  arguments?: Record<string, any>;
}

export interface ControlMessage extends BaseMessage {
  type: 'control';
  event?: ControlEvent;
  payload?: ControlPayload;
}

// Event Message Payloads
export interface EventPayload {
  type: EventType;
  response?: {
    id: string;
  };
}

export interface EventMessage extends BaseMessage {
  type: 'event';
  payload: EventPayload;
}

// Union type for all messages
export type WebSocketMessage =
  | TextMessage
  | AudioMessage
  | ControlMessage
  | EventMessage;

// Chat Message for UI
export interface ChatMessage {
  id: string;
  text: string;
  role: 'user' | 'assistant';
  timestamp: number;
  final?: boolean;
  isLoading?: boolean;
  audioChunks?: string[]; // base64 encoded audio chunks
  hasAudio?: boolean; // indicates if message includes audio
  isVoiceMessage?: boolean; // true if sent via voice, false if sent via text
}

// Connection Status
export type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error';

// Error Codes
export enum ErrorCode {
  HANDSHAKE_FAILED = 'HANDSHAKE_FAILED',
  RATE_LIMITED = 'RATE_LIMITED',
  INVALID_MESSAGE = 'INVALID_MESSAGE',
  UPSTREAM_FAILURE = 'UPSTREAM_FAILURE',
  PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND',
}
