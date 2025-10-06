import React from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import Header from '../baseComponents/Header';
import {Toast} from 'react-native-toast-notifications';
import Swiper from 'react-native-deck-swiper';

const TinderSwipe = () => {
  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
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
            Toast.show('Swiped left', {
              type: 'error',
              placement: 'bottom',
              duration: 2000,
            });
          }}
          onSwipedRight={() => {
            Toast.show('Swiped right', {
              type: 'success',
              placement: 'bottom',
              duration: 2000,
            });
          }}
          onSwipedAll={() => {
            Toast.show('All cards swiped', {
              type: 'default',
              placement: 'bottom',
              duration: 2000,
            });
          }}
          showSecondCard={true}
          cardIndex={0}
          verticalSwipe={false}
          stackSize={2}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Tinder Swipe" isBackVisible />
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
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: '80%',
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: '#00000040',
    width: '100%',
    color: 'white',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#212121',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TinderSwipe;
