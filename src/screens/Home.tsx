import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Header from '../baseComponents/Header';

const Home = () => {
  const navigation = useNavigation();

  const componentList = [
    {
      id: 1,
      icon: require('../assets/icons/location.png'),
      title: 'User Location',
      screen: 'UserLocation',
    },
    {
      id: 2,
      icon: require('../assets/icons/week.png'),
      title: 'Week Calender',
      screen: 'Calender',
    },
    {
      id: 3,
      icon: require('../assets/icons/qr-code.png'),
      title: 'QR Code Generator',
      screen: 'QRCodeGen',
    },
    {
      id: 4,
      icon: require('../assets/icons/checkbox.png'),
      title: 'CheckBox',
      screen: 'CheckBox',
    },
    {
      id: 5,
      icon: require('../assets/icons/anim.png'),
      title: 'Slide Animation',
      screen: 'SlideAnimation',
    },
    {
      id: 6,
      icon: require('../assets/icons/see-more.png'),
      title: 'See More Text',
      screen: 'SeeMoreText',
    },
    {
      id: 7,
      icon: require('../assets/icons/button.png'),
      title: 'Disabled Button',
      screen: 'DisabledButton',
    },
    {
      id: 8,
      icon: require('../assets/icons/butterfly.png'),
      title: 'Flapping Butterfly',
      screen: 'FlappingButterfly',
    },
    {
      id: 9,
      icon: require('../assets/icons/toast.png'),
      title: 'Custom Toast',
      screen: 'CustomToast',
    },
    {
      id: 10,
      icon: require('../assets/icons/cards.png'),
      title: 'Tinder Swipe',
      screen: 'TinderSwipe',
    },
    {
      id: 11,
      icon: require('../assets/icons/buffer.png'),
      title: 'Buffer Video Player',
      screen: 'BufferVideoPlayer',
    },
    {
      id: 12,
      icon: require('../assets/icons/player.png'),
      title: 'Smart Video Player',
      screen: 'SmartVideoPlayer',
    },
    {
      id: 13,
      icon: require('../assets/icons/masonry.png'),
      title: 'Masonry List',
      screen: 'Masonry',
    },
    {
      id: 14,
      icon: require('../assets/icons/grid.png'),
      title: 'Grid Feed',
      screen: 'GridFeed',
    },
    {
      id: 15,
      icon: require('../assets/icons/sticky-cards.png'),
      title: 'Stick Center Cards',
      screen: 'StickCenterCards',
    },
    {
      id: 16,
      icon: require('../assets/icons/sticky-cards.png'),
      title: 'Sticky Header Cards V1',
      screen: 'StickyHeaderCardsVersionOne',
    },
    {
      id: 17,
      icon: require('../assets/icons/sticky-cards.png'),
      title: 'Sticky Header Cards V2',
      screen: 'StickyHeaderCardsVersionTwo',
    },
    {
      id: 18,
      icon: require('../assets/icons/sticky-cards.png'),
      title: 'Smart Chat',
      screen: 'SmartChat',
    },
  ];

  const renderItem = ({
    item,
  }: {
    item: {id: number; icon: any; title: string; screen: string};
  }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.listItem}
      onPress={() => navigation.navigate(item.screen as never)}>
      <Image style={styles.itemIcon} source={item.icon} />
      <Text style={styles.itemText}>{item.title}</Text>
      <Image
        style={styles.nextIcon}
        source={require('../assets/icons/next.png')}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Components" />
      <FlatList
        data={componentList.reverse()}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  nextIcon: {
    width: 16,
    height: 16,
    marginLeft: 'auto',
  },
});

export default Home;
