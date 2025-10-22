import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Header from '../baseComponents/Header';

import UserSelector from './UserSelector';
import {ChatWebSocketService} from '../services/ChatWebSocketService';
import {
  ChatMessage as ChatMessageType,
  ConnectionStatus,
  WebSocketMessage,
  TextMessage,
  ControlMessage,
} from '../types/chat.types';
import {WEBSOCKET_CONFIG} from '../config/websocket.config';
import ChatMessage from '../baseComponents/ChatMessage';

const SmartVoiceChat = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>(
    WEBSOCKET_CONFIG.USER_NAME,
  );

  const wsServiceRef = useRef<ChatWebSocketService | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const currentResponseIdRef = useRef<string | null>(null);

  const userNames = [
    {id: 1, label: 'Rajesh Nigam', value: 'Rajesh Nigam'},
    {id: 2, label: 'Sidharth Runwal', value: 'Sidharth Runwal'},
    {id: 3, label: 'Deepak Goyal', value: 'Deepak Goyal'},
    {id: 4, label: 'Janhavi Pawar', value: 'Janhavi Pawar'},
    {id: 5, label: 'Gautham Pai', value: 'Gautham Pai'},
    {id: 6, label: 'Pintu Dholakia', value: 'Pintu Dholakia'},
    {id: 7, label: 'Abhijit Pawar', value: 'Abhijit Pawar'},
    {id: 8, label: 'Uzma Irfan', value: 'Uzma Irfan'},
    {id: 9, label: 'Veda Krishnamurthy', value: 'Veda Krishnamurthy'},
  ];

  useEffect(() => {
    initializeWebSocket();

    return () => {
      wsServiceRef.current?.disconnect();
    };
  }, []);

  const initializeWebSocket = () => {
    wsServiceRef.current = new ChatWebSocketService({
      host: WEBSOCKET_CONFIG.HOST,
      port: WEBSOCKET_CONFIG.PORT,
      userName: selectedUser,
      onMessage: handleIncomingMessage,
      onConnectionChange: handleConnectionChange,
      onError: handleError,
    });

    wsServiceRef.current.connect();
  };

  const handleIncomingMessage = (message: WebSocketMessage) => {
    console.log('Received message:', message);

    if (message.type === 'text') {
      const textMessage = message as TextMessage;
      const {text, role, final} = textMessage.payload;

      if (role === 'assistant') {
        setMessages(prev => {
          // Find the last assistant message that is still being streamed
          const existingIndex = prev.findIndex(
            msg => msg.role === 'assistant' && !msg.final,
          );

          if (existingIndex !== -1) {
            // Update existing message - APPEND new text to existing text
            const updated = [...prev];
            const existingMessage = updated[existingIndex];

            // APPEND the new chunk to the existing text
            // Backend sends incremental chunks, not cumulative text
            const updatedText = final
              ? text // If final, use the complete text from backend
              : existingMessage.text + text; // Otherwise, append new chunk

            updated[existingIndex] = {
              ...existingMessage,
              id: message.id,
              text: updatedText, // Use appended text
              timestamp: message.timestamp,
              final: final || false,
              isLoading: !final,
            };
            return updated;
          } else {
            // No existing streaming message, create new one
            return [
              ...prev,
              {
                id: message.id,
                text,
                role: 'assistant',
                timestamp: message.timestamp,
                final: final || false,
                isLoading: !final,
              },
            ];
          }
        });

        if (final) {
          setIsWaitingForResponse(false);
          currentResponseIdRef.current = null;
        } else {
          currentResponseIdRef.current = message.id;
        }
      }
    } else if (message.type === 'control') {
      const controlMessage = message as ControlMessage;
      if (controlMessage.event === 'ready') {
        console.log('Connection ready');
        setError(null);
      } else if (controlMessage.event === 'error') {
        const errorMsg = controlMessage.payload?.message || 'Unknown error';
        setError(errorMsg);
        setIsWaitingForResponse(false);
        currentResponseIdRef.current = null;
      }
    } else if (message.type === 'event') {
      console.log('Event:', message.payload);
    }
  };

  const handleConnectionChange = (status: ConnectionStatus) => {
    console.log('Connection status:', status);
    setConnectionStatus(status);

    if (status === 'connected') {
      setError(null);
    }
  };

  const handleError = (err: Error) => {
    console.error('WebSocket error:', err);
    setError(err.message);
    setIsWaitingForResponse(false);
  };

  const handleUserChange = (userName: string) => {
    console.log('Changing user to:', userName);

    // Disconnect current session
    if (wsServiceRef.current) {
      wsServiceRef.current.disconnect();
    }

    // Update selected user
    setSelectedUser(userName);

    // Clear messages and reset states
    setMessages([]);
    setError(null);
    setIsWaitingForResponse(false);
    setInputText('');
    currentResponseIdRef.current = null;

    // Reconnect with new user
    setTimeout(() => {
      wsServiceRef.current = new ChatWebSocketService({
        host: WEBSOCKET_CONFIG.HOST,
        port: WEBSOCKET_CONFIG.PORT,
        userName: userName,
        onMessage: handleIncomingMessage,
        onConnectionChange: handleConnectionChange,
        onError: handleError,
      });
      wsServiceRef.current.connect();
    }, 100);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) {
      return;
    }

    if (!wsServiceRef.current?.isConnected()) {
      setError('Not connected to server. Trying to reconnect...');
      wsServiceRef.current?.connect();
      return;
    }

    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      text: inputText.trim(),
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsWaitingForResponse(true);
    setError(null);

    const success = wsServiceRef.current.sendText(inputText.trim(), 'text');

    if (!success) {
      setError('Failed to send message. Please try again.');
      setIsWaitingForResponse(false);
    }

    setInputText('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  const renderMessage = ({item}: {item: ChatMessageType}) => {
    return <ChatMessage message={item} />;
  };

  const renderConnectionStatus = () => {
    let statusText = 'Disconnected';
    let statusColor = '#999';

    switch (connectionStatus) {
      case 'connecting':
        statusText = 'Connecting...';
        statusColor = '#FFA500';
        break;
      case 'connected':
        statusText = 'Connected';
        statusColor = '#4CAF50';
        break;
      case 'error':
        statusText = 'Connection Error';
        statusColor = '#F44336';
        break;
    }

    return (
      <View style={styles.statusBar}>
        <View
          style={[styles.statusIndicator, {backgroundColor: statusColor}]}
        />
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
    );
  };

  const renderError = () => {
    if (!error) return null;

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => setError(null)}>
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Say hello to Genie</Text>
        <Text style={styles.emptySubtitle}>
          Send a message to begin chatting with Genie.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Smart Chat" isBackVisible />
      {renderConnectionStatus()}
      <UserSelector
        users={userNames}
        selectedUser={selectedUser}
        onUserChange={handleUserChange}
        disabled={connectionStatus === 'connecting'}
      />
      {renderError()}

      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          ListEmptyComponent={renderEmptyState}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
        />

        <View style={styles.inputContainer}>
          {isWaitingForResponse && (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.loadingText}>AI is typing...</Text>
            </View>
          )}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor="#999"
              multiline
              maxLength={500}
              editable={
                connectionStatus === 'connected' && !isWaitingForResponse
              }
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!inputText.trim() ||
                  connectionStatus !== 'connected' ||
                  isWaitingForResponse) &&
                  styles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={
                !inputText.trim() ||
                connectionStatus !== 'connected' ||
                isWaitingForResponse
              }>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFCDD2',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#C62828',
  },
  dismissText: {
    fontSize: 14,
    color: '#C62828',
    fontWeight: '600',
  },
  messagesList: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SmartVoiceChat;
