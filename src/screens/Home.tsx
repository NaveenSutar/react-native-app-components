//import liraries
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Button, ScrollView} from 'react-native';

// create a component
const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Button
        title="Remember Me"
        onPress={() => navigation.navigate('RememberMe')}
      />
      <Button title="Toast" onPress={() => navigation.navigate('MyToast')} />
      <Button
        title="Hidden Button"
        onPress={() => navigation.navigate('ButtonScreen')}
      />
      <Button title="Feed" onPress={() => navigation.navigate('Feed')} />
      <Button
        title="Feed Square and Rect"
        onPress={() => navigation.navigate('FeedGridSqNRect')}
      />
      <Button title="Masonry" onPress={() => navigation.navigate('Masonry')} />
      <Button
        title="Toast On Modal"
        onPress={() => navigation.navigate('ToastOnModal')}
      />
      <Button
        title="User Location"
        onPress={() => navigation.navigate('UserLocation')}
      />
      <Button
        title="Tinder Swipe"
        onPress={() => navigation.navigate('TinderSwipe')}
      />
      <Button title="QR Code" onPress={() => navigation.navigate('QRCode')} />
      <Button
        title="See more text"
        onPress={() => navigation.navigate('SeeMore')}
      />
      <Button
        title="Slide Animation"
        onPress={() => navigation.navigate('SlideAnim')}
      />
      <Button
        title="Video Player with Buffer"
        onPress={() => navigation.navigate('VideoPlayer')}
      />
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;
