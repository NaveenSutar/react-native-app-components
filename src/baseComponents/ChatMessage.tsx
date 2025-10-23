import React from 'react';
import {View, Text, StyleSheet, ViewStyle, Image} from 'react-native';
import {ChatMessage as ChatMessageType} from '../types/chat.types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({message}) => {
  const isUser = message.role === 'user';
  const isLoading = message.isLoading && !message.final;
  const hasAudio = message.hasAudio || false;
  const isVoiceMessage = message.isVoiceMessage || false;

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.assistantMessageContainer,
      ]}>
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.assistantBubble,
        ]}>
        {isVoiceMessage && isUser && (
          <View style={styles.voiceIndicator}>
            {/* <Text style={styles.voiceIcon}>🎤</Text> */}
            <Text
              style={[
                styles.voiceLabel,
                isUser ? styles.userText : styles.assistantText,
              ]}>
              Voice Message
            </Text>
          </View>
        )}
        {hasAudio && !isUser && (
          <View style={styles.audioIndicator}>
            <Image
              style={styles.audioIcon}
              source={require('../assets/icons/waves.png')}
            />
            <Text style={styles.audioLabel}>Playing audio...</Text>
          </View>
        )}
        {message.text && message.text !== '[Voice Message]' && (
          <Text
            style={[
              styles.messageText,
              isUser ? styles.userText : styles.assistantText,
            ]}>
            {message.text}
          </Text>
        )}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingDot} />
            <View style={[styles.loadingDot, styles.loadingDotDelay1]} />
            <View style={[styles.loadingDot, styles.loadingDotDelay2]} />
          </View>
        )}
      </View>
      <Text style={styles.timestamp}>{formatTimestamp(message.timestamp)}</Text>
    </View>
  );
};

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  assistantMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    marginHorizontal: 8,
  },
  voiceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  voiceLabel: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  audioIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
  },
  audioIcon: {
    marginRight: 6,
    height: 12,
    width: 12,
    tintColor: '#007AFF',
  },
  audioLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
    marginHorizontal: 2,
    opacity: 0.3,
  },
  loadingDotDelay1: {
    opacity: 0.5,
  },
  loadingDotDelay2: {
    opacity: 0.7,
  },
});

export default ChatMessage;
