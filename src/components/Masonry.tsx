import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../baseComponents/Header';
import MasonryList from '@react-native-seoul/masonry-list';
import {combinedData} from '../assets/data/combinedData';

const {width} = Dimensions.get('window');

const Masonry = () => {
  const renderNewItem = ({item}: any) => {
    const isReel = item?.title;
    const itemStyle = isReel ? styles.video : styles.image;

    return (
      <View style={itemStyle}>
        {isReel ? (
          <TouchableOpacity>
            <Image source={{uri: item.thumbnail}} style={styles.media} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Image source={{uri: item.mainImage?.url}} style={styles.media} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <MasonryList
          keyExtractor={item => item.id}
          data={combinedData}
          renderItem={renderNewItem}
          numColumns={3}
          style={styles.masonryStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Masonry List" isBackVisible />
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
    flex: 1,
  },
  masonryStyle: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  image: {
    width: width / 3 - 16,
    height: width / 3 - 12,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 3,
    resizeMode: 'cover',
  },
  video: {
    width: width / 3 - 16,
    height: (width / 3) * 2 - 16,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 3,
    resizeMode: 'cover',
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

export default Masonry;
