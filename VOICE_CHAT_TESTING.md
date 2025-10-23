# Quick Start: Testing Voice Chat

## Prerequisites

Make sure you have:

1. Backend server running at the configured WebSocket endpoint
2. Microphone permissions granted on your device
3. Physical device for testing (recommended, as simulators may have audio issues)

## Build and Run

### iOS

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

### Android

```bash
npx react-native run-android
```

## Testing Steps

### 1. Test Text Chat (Existing Functionality)

1. Open the SmartVoiceChat screen
2. Wait for "Connected" status
3. Type "Hello" in the text input
4. Press "Send" button
5. ✅ Should receive text-only response
6. ✅ No audio should play

### 2. Test Voice Chat (New Functionality)

1. Make sure connection status shows "Connected"
2. Press the microphone button (🎤)
3. ✅ Button should turn red with stop icon (⏹)
4. ✅ Text input should be disabled
5. Speak your question (e.g., "What's the weather like?")
6. Press the stop button (⏹)
7. ✅ Should see "[Voice Message]" with 🎤 icon in your message
8. ✅ Should see "AI is typing..." indicator
9. ✅ Should hear audio response playing automatically
10. ✅ Should see text transcript appearing in real-time
11. ✅ Assistant message should show 🔊 "Playing audio..." indicator

### 3. Test Mixed Conversation

1. Send a text message → receive text only
2. Send a voice message → receive audio + text
3. Send another text message → receive text only
4. ✅ Verify correct response types for each input type

### 4. Test Error Handling

1. Try recording without network connection
   - ✅ Should show error message
2. Press microphone while waiting for response
   - ✅ Button should be disabled
3. Try recording while another recording is in progress
   - ✅ Should prevent duplicate recording

## Expected Behavior

### Text Input → Text Output

```
User: [Types] "Hello"
Backend: [Text] "Hi there! How can I help you?"
UI: Shows text only, no audio playback
```

### Voice Input → Audio + Text Output

```
User: [Voice] 🎤 "[Voice Message]"
Backend: [Audio chunks] + [Text transcript]
UI:
  - Plays audio sequentially
  - Shows 🔊 "Playing audio..."
  - Displays text transcript in real-time
  - Shows loading dots until final text received
```

## Troubleshooting

### Microphone Not Working

- Check app has microphone permissions
- On iOS: Settings > [Your App] > Microphone
- On Android: Settings > Apps > [Your App] > Permissions > Microphone

### Audio Not Playing

- Check device volume is not muted
- Check audio output (speaker/headphones)
- Look for errors in console logs
- Try restarting the app

### Connection Issues

- Verify WebSocket server is running
- Check WEBSOCKET_CONFIG in `src/config/websocket.config.ts`
- Look for "Connected" status before testing

### Recording Errors

- Make sure you're testing on a real device
- Simulator audio recording may not work properly
- Check console logs for specific error messages

## Debug Logs

Look for these prefixes in console:

- `[AudioRecorder]` - Recording service logs
- `[AudioPlayer]` - Playback service logs
- `[ChatWS]` - WebSocket communication logs
- `[SmartVoiceChat]` - Component-level logs

## Console Commands for Debugging

### Check Audio Permissions (iOS)

```bash
npx react-native log-ios
```

### Check Audio Permissions (Android)

```bash
npx react-native log-android
adb logcat | grep -i audio
```

### Monitor WebSocket Traffic

Look for messages in console:

- `[ChatWS] Sent: audio` - Outgoing audio
- `[ChatWS] Received: audio` - Incoming audio
- `[ChatWS] Received: text` - Incoming text

## Success Criteria

✅ Text messages work without audio playback
✅ Voice messages trigger audio recording
✅ Recorded audio sends to backend
✅ Audio chunks play sequentially
✅ Text transcript displays during audio playback
✅ Visual indicators show for voice/audio messages
✅ UI disables correctly during recording/waiting states
✅ Error messages display for failures

## Next Steps

Once basic functionality works:

1. Test with longer voice messages
2. Test rapid switching between text and voice
3. Test edge cases (very short recordings, network drops, etc.)
4. Fine-tune audio quality settings if needed
5. Add additional features as per requirements
