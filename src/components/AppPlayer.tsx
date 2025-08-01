import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';

const {width: screenWidth} = Dimensions.get('window');

const AppPlayer = ({src, width = screenWidth - 40, height = 200}) => {
  const videoRef = useRef(null);
  const [loadState, setLoadState] = useState('not-loaded');
  const [bufferInfo, setBufferInfo] = useState({
    buffered: 0,
    current: 0,
    duration: 0,
  });
  const [isPlaying, setIsPlaying] = useState(true);

  // 🎯 SMART BUFFERING CONFIG
  const bufferConfig = {
    minBufferMs: 3000, // 3 seconds minimum buffer
    maxBufferMs: 10000, // 10 seconds maximum buffer
    bufferForPlaybackMs: 2000, // 2 seconds needed to start playback
    bufferForPlaybackAfterRebufferMs: 3000, // 3 seconds after rebuffer
  };

  const onLoad = data => {
    console.log('📹 Video loaded:', data);
    setBufferInfo(prev => ({...prev, duration: data.duration}));
    setLoadState('ready');
  };

  const onProgress = data => {
    const bufferedAhead = data.playableDuration - data.currentTime;

    setBufferInfo({
      current: data.currentTime,
      buffered: bufferedAhead,
      duration: data.seekableDuration || bufferInfo.duration,
    });

    // 🎯 SMART BUFFERING LOGIC
    if (isPlaying) {
      console.log(
        'Current: ${data.currentTime.toFixed(1)}s, Buffered ahead: ${bufferedAhead.toFixed(1)}s',
      );

      if (bufferedAhead < 3) {
        console.log('🔄 Buffer low - requesting more data');
        // React Native Video handles this automatically, but we can track it
      } else if (bufferedAhead > 15) {
        console.log('⏹️ Buffer sufficient');
      }
    }
  };

  const onBuffer = ({isBuffering}) => {
    if (isBuffering) {
      console.log('🔄 Buffering...');
      setLoadState('buffering');
    } else {
      console.log('✅ Buffer ready');
      setLoadState('playing');
    }
  };

  const onReadyForDisplay = () => {
    setLoadState('initial-loaded');
  };

  const onPlaybackStateChanged = ({isPlaying: playing}) => {
    setIsPlaying(playing);
    setLoadState(playing ? 'playing' : 'paused');
    console.log(playing ? '▶️ Playing' : '⏸️ Paused');
  };

  const onError = error => {
    console.error('❌ Video error:', error);
    setLoadState('error');
  };

  // Manual controls
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = seconds => {
    if (videoRef.current) {
      videoRef.current.seek(seconds);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart HLS Player - React Native</Text>

      {/* 🎯 VIDEO COMPONENT WITH HLS SUPPORT */}
      <Video
        ref={videoRef}
        source={{
          uri: src,
        }}
        style={[styles.video, {width, height}]}
        bufferConfig={bufferConfig}
        paused={!isPlaying}
        resizeMode="contain"
        repeat={false}
        progressUpdateInterval={1000}
        controls={false}
        onLoad={onLoad}
        onProgress={onProgress}
        onBuffer={onBuffer}
        onReadyForDisplay={onReadyForDisplay}
        onPlaybackStateChanged={onPlaybackStateChanged}
        onError={onError}
        selectedVideoTrack={{type: 'auto'}}
        allowsExternalPlayback={true}
        reportBandwidth={true}
      />

      {/* 🎯 BUFFER STATUS DISPLAY */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>📊 Buffer Status:</Text>
        <Text style={styles.statusText}>
          State:{' '}
          <Text style={[styles.statusValue, {color: getStateColor(loadState)}]}>
            {loadState}
          </Text>
        </Text>
        <Text style={styles.statusText}>
          Current: {bufferInfo.current.toFixed(1)}s
        </Text>
        <Text style={styles.statusText}>
          Buffer Ahead: {bufferInfo.buffered.toFixed(1)}s
        </Text>
        <Text style={styles.statusText}>
          Duration: {bufferInfo.duration.toFixed(1)}s
        </Text>
        <Text style={styles.statusText} numberOfLines={1}>
          URL: {src}
        </Text>
      </View>

      {/* 🎯 CUSTOM CONTROLS */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handlePlayPause}>
          <Text style={styles.controlText}>
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => handleSeek(0)}>
          <Text style={styles.controlText}>⏮️ Restart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => handleSeek(bufferInfo.current + 10)}>
          <Text style={styles.controlText}>⏭️ +10s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStateColor = state => {
  const colors = {
    'not-loaded': '#999',
    ready: '#f39c12',
    'initial-loaded': '#27ae60',
    playing: '#3498db',
    paused: '#e74c3c',
    buffering: '#9b59b6',
    error: '#e74c3c',
  };
  return colors[state] || '#333';
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  video: {
    backgroundColor: '#000',
    borderRadius: 8,
  },
  statusContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusValue: {
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
    width: '100%',
  },
  controlButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  controlText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AppPlayer;
