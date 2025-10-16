# SmartChat - Real-time WebSocket Chat Implementation

## Overview

This implementation provides a fully functional real-time chat interface that follows the **Indulge AI Backend - Realtime Voice Agent** protocol. It supports text-based communication with WebSocket, automatic reconnection, heartbeat management, and a clean UI.

## Features Implemented

✅ **WebSocket Connection Management**

- Automatic connection and reconnection (up to 5 attempts)
- Connection status indicator
- Heartbeat (ping/pong) handling
- Query parameter authentication with `userName`

✅ **Text Messaging**

- Send text messages to the backend
- Receive text responses from the AI assistant
- Display conversation history
- Support for partial and final transcripts

✅ **Rate Limiting**

- Client-side rate limiting (5 messages per 2 seconds)
- Automatic message queuing when disconnected

✅ **Error Handling**

- Display connection errors
- Handle backend error codes (HANDSHAKE_FAILED, RATE_LIMITED, etc.)
- User-friendly error messages

✅ **UI Components**

- Chat message bubbles (user vs assistant styling)
- Message timestamps
- Loading indicators while AI is responding
- Empty state for new conversations
- Keyboard-aware input field
- Send button with disabled states

## File Structure

```
src/
├── components/
│   ├── SmartChat.tsx           # Main chat component
│   └── ChatMessage.tsx         # Individual message component
├── services/
│   └── ChatWebSocketService.ts # WebSocket service class
├── types/
│   └── chat.types.ts           # TypeScript interfaces
└── config/
    └── websocket.config.ts     # Configuration settings
```

## Configuration

Before using the chat, you need to configure the WebSocket connection settings:

1. Open `src/config/websocket.config.ts`
2. Update the following values:

```typescript
export const WEBSOCKET_CONFIG = {
  HOST: 'your-backend-host.com', // Replace with your backend host
  PORT: 8080, // Replace with your WebSocket port
  USER_NAME: 'NavinSutar', // Your username
};
```

### Example Configurations

**Local Development:**

```typescript
HOST: 'localhost';
PORT: 8080;
```

**Production:**

```typescript
HOST: 'api.indulge-ai.com';
PORT: 443;
```

## Usage

The SmartChat component is already integrated and ready to use. It will:

1. **Auto-connect** when the component mounts
2. **Display connection status** at the top (Disconnected, Connecting, Connected, Error)
3. **Show error messages** if connection fails
4. **Handle reconnection** automatically

### Sending Messages

1. Type your message in the input field
2. Press the "Send" button or hit Enter
3. Your message appears on the right side (blue bubble)
4. AI responses appear on the left side (gray bubble)
5. Loading indicator shows while waiting for response

### Connection States

- 🔴 **Disconnected**: Not connected to server
- 🟠 **Connecting**: Attempting to establish connection
- 🟢 **Connected**: Successfully connected and ready
- 🔴 **Error**: Connection failed

## Protocol Implementation

### Message Format

All messages follow the protocol's JSON envelope:

```json
{
  "type": "text",
  "id": "uuid",
  "timestamp": 1731678912345,
  "payload": {
    "text": "Your message here",
    "output": "text"
  }
}
```

### Supported Message Types

1. **Text Messages** (`type: "text"`)

   - User messages sent to backend
   - AI responses received from backend
   - Partial transcripts (final: false)
   - Final transcripts (final: true)

2. **Control Messages** (`type: "control"`)

   - `ping` / `pong` for heartbeat
   - `ready` when connection is established
   - `error` for error notifications

3. **Event Messages** (`type: "event"`)
   - `response.created` when AI starts responding
   - `response.done` when AI finishes
   - `response.tool_call` when AI uses search

### Error Handling

The implementation handles all protocol error codes:

| Error Code        | Description          | Client Action                     |
| ----------------- | -------------------- | --------------------------------- |
| HANDSHAKE_FAILED  | Invalid userName     | Show error, allow retry           |
| RATE_LIMITED      | Too many messages    | Show warning, auto-retry after 3s |
| INVALID_MESSAGE   | Bad JSON format      | Log error                         |
| UPSTREAM_FAILURE  | Backend/GPT issue    | Show fallback message             |
| PROFILE_NOT_FOUND | User profile missing | Show warning, continue            |

### Rate Limiting

- Maximum: 5 messages per 2 seconds
- Exceeding limit shows: "Rate limited. Please wait a moment."
- Messages are queued and sent when limit resets

### Heartbeat

- Server sends ping every 20 seconds
- Client responds with pong within 10 seconds
- Connection closes if pong times out

## Testing

### Test Without Backend

The app will show "Connecting..." and then "Connection Error" if the backend is not available. This is expected behavior.

### Test With Backend

1. Configure your backend host and port
2. Ensure backend is running on `wss://<host>:<port>/realtime`
3. Launch the app
4. Navigate to "Smart Chat"
5. Wait for "Connected" status
6. Send test messages

### Test Messages

Try these example messages:

- "Hello, how are you?"
- "Tell me about private jets"
- "What's the weather like?"

## Troubleshooting

### "Not connected to server"

- Check `websocket.config.ts` has correct HOST and PORT
- Ensure backend is running
- Check network connectivity

### "Connection Error"

- Verify backend endpoint is `wss://<host>:<port>/realtime`
- Check if userName query parameter is accepted
- Review backend logs for connection issues

### "Rate limited"

- Wait 2-3 seconds between messages
- Don't send more than 5 messages quickly

### Messages not appearing

- Check browser/app console for errors
- Verify WebSocket connection is "Connected"
- Check backend logs for processing issues

## Advanced Features (Not Implemented)

The following features are part of the protocol but not implemented (as requested):

❌ Audio streaming (base64 PCM audio)
❌ Audio responses from backend
❌ Voice input/output

These can be added later by extending the WebSocketService and UI components.

## Dependencies

This implementation uses only standard React Native components and built-in WebSocket support. No additional packages are required.

## Next Steps

1. Update `websocket.config.ts` with your backend details
2. Test the connection
3. Start chatting!

For backend setup and protocol details, refer to the original documentation:
https://dashing-devourer-b6b.notion.site/Indulge-AI-Backend-Realtime-Voice-Agent-28e606a324a8803cabdfce0b5130d2b2
