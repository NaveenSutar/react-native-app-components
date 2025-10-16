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

const StickCenterCards = () => {
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
    const cardTop = index * (CARD_HEIGHT + 16); // Card height + margin
    const nextCardTop = (index + 1) * (CARD_HEIGHT + 16);

    // Calculate when this card should start sticking
    const stickyOffset = index * HEADER_HEIGHT;

    const translateY = scrollY.interpolate({
      inputRange: [
        cardTop - stickyOffset,
        nextCardTop - stickyOffset - HEADER_HEIGHT,
      ],
      outputRange: [0, -CARD_HEIGHT + HEADER_HEIGHT],
      extrapolate: 'clamp',
    });

    // Scale effect for stacking
    const scale = scrollY.interpolate({
      inputRange: [cardTop - stickyOffset, nextCardTop - stickyOffset],
      outputRange: [1, 0.95],
      extrapolate: 'clamp',
    });

    // Opacity for details (fade out when sticking, except last card)
    const detailsOpacity = isLastCard
      ? 1
      : scrollY.interpolate({
          inputRange: [
            cardTop - stickyOffset,
            cardTop - stickyOffset + HEADER_HEIGHT,
          ],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        });

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.stickyCard,
          {
            transform: [{translateY}, {scale}],
            zIndex: cardData.length - index,
            top: cardTop,
          },
        ]}>
        <ImageBackground
          source={item.backgroundImage}
          style={styles.imageBackground}
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
    const totalHeight = cardData.length * (CARD_HEIGHT + 16) + 200;

    return (
      <ScrollView
        style={styles.scrollContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.contentContainer, {height: totalHeight}]}>
          {cardData.map((item, index) => renderCard(item, index))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Sticky Center Cards" isBackVisible />
      {renderComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  stickyCard: {
    position: 'absolute',
    left: 16,
    right: 16,
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
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    // This stays visible when card becomes sticky
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

export default StickCenterCards;
