import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Header from '../baseComponents/Header';

const {width} = Dimensions.get('window');
const columnWidth = width / 3 - 16;

const images = [
  require('./../assets/images/slideAnimAssets/1.png'),
  require('./../assets/images/slideAnimAssets/2.png'),
  require('./../assets/images/slideAnimAssets/3.png'),
  require('./../assets/images/slideAnimAssets/4.png'),
  require('./../assets/images/slideAnimAssets/5.png'),
  require('./../assets/images/slideAnimAssets/6.png'),
  require('./../assets/images/slideAnimAssets/7.png'),
  require('./../assets/images/slideAnimAssets/8.jpg'),
];

const animationOrder = [0, 1, 2, 5, 4, 3, 6, 7];

const SlideAnimation = () => {
  const animations = Array.from({length: 9}, () => ({
    opacity: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(30)).current,
  }));

  useEffect(() => {
    const animList = animationOrder.map((index, delayIndex) =>
      Animated.parallel([
        Animated.timing(animations[index].opacity, {
          toValue: 1,
          duration: 1000,
          delay: delayIndex * 300,
          useNativeDriver: true,
        }),
        Animated.timing(animations[index].translateY, {
          toValue: 0,
          duration: 1000,
          delay: delayIndex * 300,
          useNativeDriver: true,
        }),
      ]),
    );

    Animated.stagger(100, animList).start();
  }, []);

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.containerBack}>
          <View style={styles.gridColumn}>
            <Animated.View
              style={[
                styles.imageBox,
                {height: Dimensions.get('window').height / 3.5 + 4},
                {
                  opacity: animations[0].opacity,
                  transform: [{translateY: animations[0].translateY}],
                },
              ]}>
              <Image source={images[0]} style={styles.image} />
            </Animated.View>
            <Animated.View
              style={[
                styles.imageBox,
                {height: Dimensions.get('window').height / 3.5 + 4},

                {
                  opacity: animations[3].opacity,
                  transform: [{translateY: animations[3].translateY}],
                },
              ]}>
              <Image source={images[3]} style={styles.image} />
            </Animated.View>
          </View>

          <View style={styles.gridColumn}>
            <Animated.View
              style={[
                styles.imageBox,
                {height: Dimensions.get('window').height / 4.375},
                {
                  opacity: animations[1].opacity,
                  transform: [{translateY: animations[1].translateY}],
                },
              ]}>
              <Image source={images[1]} style={styles.image} />
            </Animated.View>
            <Animated.View
              style={[
                styles.imageBox,
                {height: Dimensions.get('window').height / 8.75},
                {
                  opacity: animations[4].opacity,
                  transform: [{translateY: animations[4].translateY}],
                },
              ]}>
              <Image source={images[4]} style={styles.image} />
            </Animated.View>
            <Animated.View
              style={[
                styles.imageBox,
                {height: Dimensions.get('window').height / 4.375},
                {
                  opacity: animations[6].opacity,
                  transform: [{translateY: animations[6].translateY}],
                },
              ]}>
              <Image source={images[6]} style={styles.image} />
            </Animated.View>
          </View>

          <View style={styles.gridColumn}>
            <Animated.View
              style={[
                styles.imageBox,
                {height: Dimensions.get('window').height / 8.75},
                {
                  opacity: animations[2].opacity,
                  transform: [{translateY: animations[2].translateY}],
                },
              ]}>
              <Image source={images[2]} style={styles.image} />
            </Animated.View>
            <Animated.View
              style={[
                styles.imageBox,
                {height: Dimensions.get('window').height / 2.92},
                {
                  opacity: animations[5].opacity,
                  transform: [{translateY: animations[5].translateY}],
                },
              ]}>
              <Image source={images[5]} style={styles.image} />
            </Animated.View>
            <Animated.View
              style={[
                styles.imageBox,
                {height: Dimensions.get('window').height / 8.75},
                {
                  opacity: animations[7].opacity,
                  transform: [{translateY: animations[7].translateY}],
                },
              ]}>
              <Image source={images[7]} style={styles.image} />
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Slide Animation" isBackVisible />
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
    padding: 16,
    alignItems: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
  },
  containerBack: {
    backgroundColor: '#fff',
  },
  gridColumn: {
    flexDirection: 'column',
    width: columnWidth,
    gap: 8,
    backgroundColor: '#fff',
  },
  imageBox: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
});

export default SlideAnimation;
