import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../baseComponents/Header';
import SmartPlayer from '../baseComponents/SmartPlayer';

const SmartVideoPlayer = () => {
  const hlsUrl =
    'https://indulge-posts.s3.ap-south-1.amazonaws.com/videos/hls/688b63413d48948bfa269467/index.m3u8';

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <SmartPlayer src={hlsUrl} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Smart Video Player" isBackVisible />
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

export default SmartVideoPlayer;
