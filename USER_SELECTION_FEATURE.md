# User Selection Feature - SmartChat

## Overview

The SmartChat component now includes a user selection dropdown that allows switching between different user profiles. When a user is selected, the WebSocket connection automatically reconnects with the new username.

## Features Added

### 1. UserSelector Component (`src/components/UserSelector.tsx`)

A reusable dropdown component with:
- **Modal-based selection UI** - Clean, native-feeling dropdown experience
- **Visual feedback** - Selected user is highlighted with a checkmark
- **Disabled state** - Cannot switch users while connecting
- **Responsive design** - Adapts to different screen sizes

### 2. Dynamic User Switching

When a user is selected:
1. **Disconnect** current WebSocket session
2. **Clear** all messages and state
3. **Update** selected username
4. **Reconnect** with new username
5. **Reset** input field and error states

## Usage

### Available Users

The component includes 9 predefined users:
1. Rajesh Nigam
2. Sidharth Runwal
3. Deepak Goyal
4. Janhavi Pawar
5. Gautham Pai
6. Pintu Dholakia
7. Abhijit Pawar
8. Uzma Irfan
9. Veda Krishnamurthy

### How to Use

1. **Open SmartChat** screen
2. **View current user** in the dropdown below the connection status
3. **Tap the dropdown** to see all available users
4. **Select a user** from the modal list
5. **Wait for reconnection** - Status will show "Connecting..." then "Connected"
6. **Start chatting** as the new user

### User Selection Flow

```
User taps dropdown
    ↓
Modal opens with user list
    ↓
User selects new username
    ↓
Current WebSocket disconnects
    ↓
Messages cleared
    ↓
New WebSocket created with selected username
    ↓
Connection established
    ↓
Ready to chat as new user
```

## Technical Implementation

### State Management

```typescript
const [selectedUser, setSelectedUser] = useState<string>(WEBSOCKET_CONFIG.USER_NAME);
```

### User Change Handler

```typescript
const handleUserChange = (userName: string) => {
  // 1. Disconnect current session
  wsServiceRef.current?.disconnect();
  
  // 2. Update selected user
  setSelectedUser(userName);
  
  // 3. Clear conversation history
  setMessages([]);
  setError(null);
  setIsWaitingForResponse(false);
  setInputText('');
  
  // 4. Reconnect with new user
  wsServiceRef.current = new ChatWebSocketService({
    host: WEBSOCKET_CONFIG.HOST,
    port: WEBSOCKET_CONFIG.PORT,
    userName: userName, // ← New username
    onMessage: handleIncomingMessage,
    onConnectionChange: handleConnectionChange,
    onError: handleError,
  });
  wsServiceRef.current.connect();
};
```

### WebSocket Integration

The selected username is passed to the WebSocket service during initialization:

```typescript
const initializeWebSocket = () => {
  wsServiceRef.current = new ChatWebSocketService({
    host: WEBSOCKET_CONFIG.HOST,
    port: WEBSOCKET_CONFIG.PORT,
    userName: selectedUser, // ← Uses current selected user
    // ... other config
  });
};
```

## UI Components

### UserSelector Props

```typescript
interface UserSelectorProps {
  users: UserOption[];        // List of available users
  selectedUser: string;        // Currently selected username
  onUserChange: (userName: string) => void;  // Callback when user changes
  disabled?: boolean;          // Disable during connection
}
```

### UserOption Type

```typescript
interface UserOption {
  id: number;      // Unique identifier
  label: string;   // Display name
  value: string;   // Username value
}
```

## Behavior Notes

### Disabled State

The dropdown is **disabled** when:
- `connectionStatus === 'connecting'`
- This prevents switching users mid-connection

### Connection States

When switching users, you'll see:
1. **Disconnected** (briefly) - As old connection closes
2. **Connecting...** - As new connection establishes
3. **Connected** - Ready to chat

### Message Persistence

⚠️ **Important**: Messages are **cleared** when switching users. Each user starts with a fresh conversation.

### Default User

The default selected user is taken from `WEBSOCKET_CONFIG.USER_NAME` (currently "NavinSutar").

## Customization

### Adding More Users

To add more users, update the `userNames` array in `SmartChat.tsx`:

```typescript
const userNames = [
  {id: 1, label: 'Rajesh Nigam', value: 'Rajesh Nigam'},
  {id: 2, label: 'Sidharth Runwal', value: 'Sidharth Runwal'},
  // Add more users here
  {id: 10, label: 'New User', value: 'New User'},
];
```

### Changing Default User

Update `websocket.config.ts`:

```typescript
export const WEBSOCKET_CONFIG = {
  USER_NAME: 'Rajesh Nigam', // ← Set default user
  // ... other config
};
```

### Styling

All styles are in the respective component files:
- `UserSelector.tsx` - Dropdown styles
- `SmartChat.tsx` - Integration styles

## Testing

### Test User Switching

1. Open SmartChat
2. Wait for initial connection
3. Send a test message
4. Switch to different user via dropdown
5. Verify:
   - ✅ Messages cleared
   - ✅ Connection shows "Connecting..." then "Connected"
   - ✅ New messages sent with new username
   - ✅ Dropdown shows new user selected

### Test Disabled State

1. Open SmartChat while disconnected
2. Select a user
3. During "Connecting..." state
4. Try to tap dropdown
5. Verify: ✅ Dropdown is disabled/unresponsive

## Files Modified

1. **`src/components/SmartChat.tsx`**
   - Added `selectedUser` state
   - Added `handleUserChange` function
   - Integrated `UserSelector` component
   - Updated WebSocket initialization

2. **`src/components/UserSelector.tsx`** (New)
   - Complete dropdown component
   - Modal-based UI
   - User list rendering
   - Selection handling

## Future Enhancements

Possible improvements:
- **Persist messages per user** (using AsyncStorage)
- **Recent users** list
- **User avatars** in dropdown
- **Search/filter** users
- **User profiles** with additional info
- **Custom username** input option

## Troubleshooting

### Dropdown Not Opening
- Check if `disabled` prop is true
- Verify connection status

### User Not Switching
- Check console logs for errors
- Verify backend accepts username changes
- Check WebSocket connection status

### Messages Not Clearing
- Verify `setMessages([])` is called
- Check React state updates

---

**Feature Complete**: User selection with dynamic WebSocket reconnection ✅
