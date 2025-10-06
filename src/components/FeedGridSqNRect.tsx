import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  initialWindowMetrics,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {videosData} from '../assets/data/dummyData';
const {width} = Dimensions.get('window');

const FeedGridSqNRect = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);

  const flatListRef = useRef(null);
  const flatListImgRef = useRef(null);
  const navigation = useNavigation();

  const {height, width} = Dimensions.get('window');

  const {top, bottom} = useSafeAreaInsets();
  const safeAreaHeight = top + bottom;
  const availableHeight = height - safeAreaHeight;

  const onScroll = (event: any) => {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    const newIndex = Math.floor(y / availableHeight);
    setCurrentIndex(newIndex);
  };

  const handleImagePress = (index: number) => {
    setVideoVisible(true);
    setCurrentIndex(index);
  };

  const renderImageItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => handleImagePress(index)}
      activeOpacity={0.8}
      style={styles.videoConatiner}>
      <Image style={styles.backgroundVideo} source={{uri: item.thumbnailUrl}} />
    </TouchableOpacity>
  );

  const renderVideoItem = ({item}) => (
    <View style={{height: availableHeight, width: width, borderRadius: 300}}>
      <Video
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        ref={videoRef}
        onError={error => console.log(error)}
        style={{height: availableHeight, width: width}}
        source={{
          uri: item.videoUrl,
        }}
        resizeMode="cover"
        muted={true}
      />
      {isLoading && (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color="blue" />
        </View>
      )}
    </View>
  );

  const renderItem = ({item, index}) => {
    const isVideo = item.type === 'video';
    const itemStyle = isVideo ? styles.video : styles.image;

    return (
      <View style={itemStyle}>
        {isVideo ? (
          <Video
            source={{uri: item.videoUrl}}
            style={styles.media}
            resizeMode="cover"
            muted={true}
            repeat={true}
          />
        ) : (
          <Image
            source={{uri: item.thumbnailUrl}}
            style={styles.media}
            resizeMode="cover"
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          key={videoVisible ? 'video' : 'grid'}
          ref={flatListImgRef}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={videosData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{gap: 4}}
          columnWrapperStyle={{gap: 4}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  videoConatiner: {
    width: Dimensions.get('window').width / 3 - 8,
  },
  backgroundVideo: {
    height: Dimensions.get('window').width / 3 - 8,
    backgroundColor: 'black',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 16,
    zIndex: 1,
    backgroundColor: 'white',
    marginTop: 16,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    padding: 4,
  },
  backButtonContainerOther: {
    marginTop: 16,
    borderRadius: 8,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: width / 3 - 8,
    height: width / 3 - 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    width: width / 3 - 8,
    height: (width / 3) * 2 - 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

export default FeedGridSqNRect;
