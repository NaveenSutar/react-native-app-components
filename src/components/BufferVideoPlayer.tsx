import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../baseComponents/Header';
import BufferPlayer from '../baseComponents/BufferPlayer';

const BufferVideoPlayer = () => {
  const hlsUrl =
    'https://indulge-posts.s3.ap-south-1.amazonaws.com/videos/hls/688b63413d48948bfa269467/index.m3u8';

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <BufferPlayer src={hlsUrl} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Buffer Video Player" isBackVisible />
      {renderComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default BufferVideoPlayer;
