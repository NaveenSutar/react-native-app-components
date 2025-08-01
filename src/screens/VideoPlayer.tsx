import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppPlayer from '../components/AppPlayer';

const VideoPlayer = () => {
  const hlsUrl =
    'https://indulge-posts.s3.ap-south-1.amazonaws.com/videos/hls/688b63413d48948bfa269467/index.m3u8';
  return (
    <View style={styles.container}>
      <AppPlayer src={hlsUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default VideoPlayer;
