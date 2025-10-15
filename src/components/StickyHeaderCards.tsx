import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import Header from '../baseComponents/Header';
import {ScreenWidth} from '../utils/appUtils';

const StickyHeaderCards = () => {
  const cardData = [
    {
      id: 1,
      title: 'Fi',
      description: 'Fi Magnifi',
      cardNumber: '6735 4895 4924 6194',
      expire: '08/29',
      cvv: '964',
      name: 'Santosh Kumar',
      backgroundImage: require('../assets/images/stickyHeaderCards/card_1.jpg'),
    },
    {
      id: 2,
      title: 'SBI',
      description: 'SBI Elite',
      cardNumber: '6726 3769 2074 8682',
      expire: '12/30',
      cvv: '439',
      name: 'Girish Sharma',
      backgroundImage: require('../assets/images/stickyHeaderCards/card_2.jpg'),
    },
    {
      id: 3,
      title: 'HDFC',
      description: 'HDFC Regalia',
      cardNumber: '6011 5940 0319 9514',
      expire: '01/28',
      cvv: '645',
      name: 'Ravi Shankar',
      backgroundImage: require('../assets/images/stickyHeaderCards/card_3.jpg'),
    },
    {
      id: 4,
      title: 'IDFC',
      description: 'IDFC First Select',
      cardNumber: '3530 1113 3330 0000',
      expire: '11/27',
      cvv: '321',
      name: 'Anil Kapoor',
      backgroundImage: require('../assets/images/stickyHeaderCards/card_4.jpg'),
    },
    {
      id: 5,
      title: 'Axis',
      description: 'Axis Magnus',
      cardNumber: '6071 5940 0319 9514',
      expire: '09/26',
      cvv: '987',
      name: 'Vijay Deenanath',
      backgroundImage: require('../assets/images/stickyHeaderCards/card_5.jpg'),
    },
  ];
  const renderComponent = () => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={cardData}
        renderItem={({item}) => (
          <View style={styles.card}>
            <ImageBackground
              source={item.backgroundImage}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
              resizeMode="cover">
              <View style={styles.overlay}>
                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDescription}>
                      {item.description}
                    </Text>
                  </View>
                  <Text style={styles.cardNumber}>{item.cardNumber}</Text>
                  <View style={styles.cardBottomRow}>
                    <Text style={styles.cardExpire}>{item.expire}</Text>
                    <Text style={styles.cardCVV}>{item.cvv}</Text>
                  </View>
                  <Text style={styles.cardName}>{item.name}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Sticky Header Cards" isBackVisible />
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
    paddingTop: 16,
    alignItems: 'center',
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    width: ScreenWidth - 32,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageBackground: {
    width: ScreenWidth - 32,
    height: (ScreenWidth - 32) / 1.6,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
  },
  cardContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
    opacity: 0.9,
  },
  cardNumber: {
    fontSize: 26,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 2,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardExpire: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
    marginRight: 48,
  },
  cardCVV: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  cardName: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default StickyHeaderCards;
