import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import Header from '../baseComponents/Header';

const FlappingButterfly = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
  }, []);

  const openOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const closedOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <Animated.Image
          source={require('../assets/images/flappingButterfly/1.png')}
          style={[styles.butterfly, {opacity: openOpacity}]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('../assets/images/flappingButterfly/2.png')}
          style={[styles.butterfly, {opacity: closedOpacity}]}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Flapping Butterfly" isBackVisible />
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
  butterfly: {
    width: 200,
    height: 200,
    position: 'absolute',
  },
});

export default FlappingButterfly;
