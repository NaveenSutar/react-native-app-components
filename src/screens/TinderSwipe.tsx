import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {Toast} from 'react-native-toast-notifications';

const TinderSwipe = () => {
  const myCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View style={styles.container}>
      <Swiper
        cards={[
          'Navin',
          'Priya',
          'Arjun',
          'Sneha',
          'Rahul',
          'Ananya',
          'Vikram',
          'Meera',
          'Kiran',
          'Deepak',
        ]}
        renderCard={card => {
          return (
            <View style={styles.card}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
                source={{
                  uri: 'https://avatar.iran.liara.run/public',
                }}>
                <Text style={styles.text}>{card}</Text>
              </ImageBackground>
            </View>
          );
        }}
        backgroundColor={'white'}
        onSwiped={cardIndex => {
          console.log(cardIndex);
        }}
        onSwipedLeft={() => {
          Toast.hideAll();
          Toast.show('Swiped left', {
            type: 'danger',
            placement: 'bottom',
            duration: 2000,
          });
        }}
        onSwipedRight={() => {
          Toast.hideAll();
          Toast.show('Swiped right', {
            type: 'success',
            placement: 'bottom',
            duration: 2000,
          });
        }}
        onSwipedAll={() => {
          Alert.alert(
            'All cards swiped',
            'You have swiped all the cards',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ],
            {cancelable: false},
          );
        }}
        showSecondCard={true}
        cardIndex={0}
        verticalSwipe={false}
        numberOfCards={5}
        stackSize={2}>
        <Button
          onPress={() => {
            console.log('oulala');
          }}
          title="Press me">
          You can press me
        </Button>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    height: '60%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: '#00000040',
    marginBottom: 20,
    width: '100%',
    color: 'white',
  },
});

export default TinderSwipe;
