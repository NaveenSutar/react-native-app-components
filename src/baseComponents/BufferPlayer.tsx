import React, {useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const BufferPlayer = ({
  src,
  width = screenWidth - 40,
  height = screenHeight / 1.5,
}: {
  src: string;
  width?: number;
  height?: number;
}) => {
  const videoRef = useRef(null);
  const [bufferInfo, setBufferInfo] = useState({
    buffered: 0,
    current: 0,
    duration: 0,
  });
  const [isPlaying, setIsPlaying] = useState(true);

  const bufferConfig = {
    minBufferMs: 3000,
    maxBufferMs: 10000,
    bufferForPlaybackMs: 2000,
    bufferForPlaybackAfterRebufferMs: 3000,
  };

  const onLoad = (data: any) => {
    setBufferInfo(prev => ({...prev, duration: data.duration}));
  };

  const onProgress = (data: any) => {
    const bufferedAhead = data.playableDuration - data.currentTime;

    setBufferInfo({
      current: data.currentTime,
      buffered: bufferedAhead,
      duration: data.seekableDuration || bufferInfo.duration,
    });
  };

  const onPlaybackStateChanged = ({
    isPlaying: playing,
  }: {
    isPlaying: boolean;
  }) => {
    setIsPlaying(playing);
  };

  return (
    <View style={styles.container}>
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
        onPlaybackStateChanged={onPlaybackStateChanged}
        selectedVideoTrack={{type: 'auto'}}
        allowsExternalPlayback={true}
        reportBandwidth={true}
      />
    </View>
  );
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

export default BufferPlayer;
