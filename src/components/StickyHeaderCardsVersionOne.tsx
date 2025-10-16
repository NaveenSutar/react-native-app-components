import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Platform,
  ScrollView,
  Animated,
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

const StickyHeaderCardsVersionOne = () => {
  const [scrollY] = useState(new Animated.Value(0));

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

  const CARD_HEIGHT = (ScreenWidth - 32) / 1.6;
  const HEADER_HEIGHT = 60;
  const INITIAL_CARD_HEIGHT = CARD_HEIGHT;

  const renderCard = (item: CardData, index: number) => {
    const isLastCard = index === cardData.length - 1;

    // Each card starts at its natural position
    const initialPosition = index * (CARD_HEIGHT + 16);

    // When scrolled, card should stick at this position from top
    const stickyPosition = index * HEADER_HEIGHT;

    // Calculate when this card should start becoming sticky
    const stickyTrigger = initialPosition - stickyPosition;

    // Position animation - card moves up until it reaches its sticky position
    const translateY = scrollY.interpolate({
      inputRange: [0, stickyTrigger],
      outputRange: [0, -stickyTrigger],
      extrapolate: 'clamp',
    });

    // Scale effect when card becomes sticky
    const scale = scrollY.interpolate({
      inputRange: [Math.max(0, stickyTrigger - 50), stickyTrigger],
      outputRange: [1, 0.98],
      extrapolate: 'clamp',
    });

    // Hide card details when it becomes sticky (except for last card)
    const detailsOpacity = isLastCard
      ? 1
      : scrollY.interpolate({
          inputRange: [Math.max(0, stickyTrigger - 30), stickyTrigger + 10],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        });

    // Reduce card height when it becomes sticky
    const cardHeight = scrollY.interpolate({
      inputRange: [Math.max(0, stickyTrigger - 20), stickyTrigger],
      outputRange: [CARD_HEIGHT, isLastCard ? CARD_HEIGHT : HEADER_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.stickyCard,
          {
            transform: [{translateY}, {scale}],
            height: cardHeight,
            zIndex: cardData.length - index,
            top: initialPosition,
          },
        ]}>
        <ImageBackground
          source={item.backgroundImage}
          style={[styles.imageBackground, {height: CARD_HEIGHT}]}
          imageStyle={styles.imageStyle}
          resizeMode="cover">
          <View style={styles.overlay}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>

              <Animated.View
                style={[styles.cardDetails, {opacity: detailsOpacity}]}>
                <Text style={styles.cardNumber}>{item.cardNumber}</Text>
                <View style={styles.cardBottomRow}>
                  <Text style={styles.cardExpire}>{item.expire}</Text>
                  <Text style={styles.cardCVV}>{item.cvv}</Text>
                </View>
                <Text style={styles.cardName}>{item.name.toUpperCase()}</Text>
              </Animated.View>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  };

  const renderComponent = () => {
    const totalContentHeight = cardData.length * CARD_HEIGHT + 500;

    return (
      <View style={styles.scrollContainer}>
        {cardData.map((item, index) => renderCard(item, index))}

        <ScrollView
          style={StyleSheet.absoluteFill}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={true}>
          <View style={{height: totalContentHeight}} />
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Sticky Header Cards V1" isBackVisible />
      {renderComponent()}
    </View>
  );
};

const CARD_HEIGHT_STYLE = (ScreenWidth - 32) / 1.6;
const HEADER_HEIGHT_STYLE = 60;

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
    position: 'absolute',
    left: 16,
    right: 16,
    width: ScreenWidth - 32,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
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
    justifyContent: 'space-between',
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
  cardHeader: {
    // This stays visible when card becomes sticky
    minHeight: HEADER_HEIGHT_STYLE - 40, // Account for padding
    justifyContent: 'center',
  },
  cardDetails: {
    // This fades out when card becomes sticky
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

export default StickyHeaderCardsVersionOne;
