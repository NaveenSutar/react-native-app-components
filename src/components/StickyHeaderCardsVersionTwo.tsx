import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import Header from '../baseComponents/Header';
import {ScreenWidth} from '../utils/appUtils';

interface CardData {
  id: number;
  title: string;
  description: string;
  cardNumber: string;
  expire: string;
  cvv: string;
  name: string;
  backgroundImage: any;
}

const StickyHeaderCardsVersionTwo = () => {
  const cardData: CardData[] = [
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
      <View style={styles.scrollContainer}>
        <ScrollView
          style={StyleSheet.absoluteFill}
          showsVerticalScrollIndicator={true}>
          {cardData.map(item => (
            <View key={item.id} style={styles.stickyCard}>
              <ImageBackground
                source={item.backgroundImage}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
                resizeMode="cover">
                <View style={styles.overlay}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDescription}>
                      {item.description}
                    </Text>
                    <View style={[styles.cardDetails]}>
                      <Text style={styles.cardNumber}>{item.cardNumber}</Text>
                      <View style={styles.cardBottomRow}>
                        <Text style={styles.cardExpire}>{item.expire}</Text>
                        <Text style={styles.cardCVV}>{item.cvv}</Text>
                      </View>
                      <Text style={styles.cardName}>
                        {item.name.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Sticky Header Cards V2" isBackVisible />
      {renderComponent()}
    </View>
  );
};

const CARD_HEIGHT_STYLE = (ScreenWidth - 32) / 1.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  stickyCard: {
    left: 16,
    width: ScreenWidth - 32,
    borderRadius: 16,
    marginTop: 16,
  },
  imageBackground: {
    width: ScreenWidth - 32,
    height: CARD_HEIGHT_STYLE,
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
  },
  cardContent: {
    padding: 20,
    height: CARD_HEIGHT_STYLE,
    justifyContent: 'space-between',
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'flex-end',
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
    marginBottom: 8,
    opacity: 0.9,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 12,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardExpire: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  cardCVV: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  cardName: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'notoserif',
  },
});

export default StickyHeaderCardsVersionTwo;
