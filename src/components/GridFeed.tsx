import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import Header from '../baseComponents/Header';

interface VideoItem {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  title?: string;
  description?: string;
}

interface RenderItemProps {
  item: VideoItem;
  index: number;
}

const GridFeed = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videosData, setVideosData] = useState<VideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);

  const flatListRef = useRef(null);
  const flatListImgRef = useRef(null);
  const navigation = useNavigation();

  const {height, width} = Dimensions.get('window');

  const {top, bottom} = useSafeAreaInsets();
  const safeAreaHeight = top + bottom;
  const availableHeight = height - safeAreaHeight;

  const videoURL =
    'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json';

  useEffect(() => {
    getVideoData();
  }, []);

  const getVideoData = () => {
    fetch(videoURL)
      .then(response => response.json())
      .then((data: VideoItem[]) => {
        const updatedVideos = data.map((video: VideoItem) => {
          return {
            ...video,
            videoUrl: video.videoUrl.replace(/^http:\/\//, 'https://'), // Update URL
          };
        });
        setVideosData(updatedVideos);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

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

  const renderImageItem = ({item, index}: RenderItemProps) => (
    <TouchableOpacity
      onPress={() => handleImagePress(index)}
      activeOpacity={0.8}
      style={styles.videoContainer}>
      <Image style={styles.backgroundVideo} source={{uri: item.thumbnailUrl}} />
    </TouchableOpacity>
  );

  const renderVideoItem = ({item}: {item: VideoItem}) => (
    <View style={{height: availableHeight, width: width, borderRadius: 300}}>
      <Video
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        ref={videoRef}
        onError={() => console.log('Error')}
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

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        {videoVisible ? (
          <View>
            <FlatList
              key={videoVisible ? 'video' : 'grid'}
              ref={flatListRef}
              data={videosData}
              renderItem={renderVideoItem}
              keyExtractor={(item, index) => index.toString()}
              pagingEnabled={true}
              onScroll={onScroll}
              initialScrollIndex={currentIndex}
              getItemLayout={(data, index) => ({
                length: availableHeight,
                offset: availableHeight * index,
                index,
              })}
            />
          </View>
        ) : (
          <View>
            <FlatList
              key={videoVisible ? 'video' : 'grid'}
              ref={flatListImgRef}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              data={videosData}
              keyExtractor={item => item.id}
              renderItem={renderImageItem}
              contentContainerStyle={styles.gridContainer}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Grid Feed" isBackVisible />
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
    flex: 1,
  },
  gridContainer: {
    marginTop: 16,
  },
  videoContainer: {
    width: Dimensions.get('window').width / 3 - 16,
    marginHorizontal: 2.5,
    marginVertical: 2.5,
  },
  backgroundVideo: {
    height: Dimensions.get('window').width / 3 - 16,
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
});

export default GridFeed;
