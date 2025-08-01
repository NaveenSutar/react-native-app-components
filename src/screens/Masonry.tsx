//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import FastImage from 'react-native-fast-image';
import {combinedData} from '../data/combinedData';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

// create a component
const Masonry = () => {
  const navigation = useNavigation();

  const renderNewItem = ({item}: any) => {
    const isReel = item?.title;
    const itemStyle = isReel ? styles.video : styles.image;

    return (
      <View style={itemStyle}>
        {isReel ? (
          <TouchableOpacity>
            <FastImage
              source={{uri: item.thumbnail}}
              style={styles.media}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FastImage
              source={{uri: item.mainImage?.url}}
              style={styles.media}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity
        style={styles.backButtonContainerOther}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      <MasonryList
        keyExtractor={item => item.id}
        data={combinedData}
        renderItem={renderNewItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
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
  backButtonContainerOther: {
    marginTop: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    padding: 4,
  },
  image: {
    width: width / 3 - 6,
    height: width / 3 - 6,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 3,
  },
  video: {
    width: width / 3 - 6,
    height: (width / 3) * 2 - 6,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 3,
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

//make this component available to the app
export default Masonry;
