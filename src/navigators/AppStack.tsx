import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';
import UserLocation from '../components/UserLocation';
import Calender from '../components/Calender';
import QRCodeGen from '../components/QRCodeGen';
import CheckBox from '../components/CheckBox';
import Blank from '../components/Blank';
import SlideAnimation from '../components/SlideAnimation';
import SeeMoreText from '../components/SeeMoreText';
import DisabledButton from '../components/DsabledButton';
import FlappingButterfly from '../components/FlappingButterfly';
import CustomToast from '../components/CustomToast';
import TinderSwipe from '../components/TinderSwipe';
import BufferVideoPlayer from '../components/BufferVideoPlayer';
import SmartVideoPlayer from '../components/SmartVideoPlayer';
import Masonry from '../components/Masonry';
import GridFeed from '../components/GridFeed';
import StickCenterCards from '../components/StickCenterCards';
import StickyHeaderCardsVersionOne from '../components/StickyHeaderCardsVersionOne';
import StickyHeaderCardsVersionTwo from '../components/StickyHeaderCardsVersionTwo';
import SmartChat from '../components/SmartChat';

const Stack = createNativeStackNavigator();

function AppStack() {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: bottom,
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserLocation" component={UserLocation} />
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="QRCodeGen" component={QRCodeGen} />
        <Stack.Screen name="CheckBox" component={CheckBox} />
        <Stack.Screen name="Blank" component={Blank} />
        <Stack.Screen name="SlideAnimation" component={SlideAnimation} />
        <Stack.Screen name="SeeMoreText" component={SeeMoreText} />
        <Stack.Screen name="DisabledButton" component={DisabledButton} />
        <Stack.Screen name="FlappingButterfly" component={FlappingButterfly} />
        <Stack.Screen name="CustomToast" component={CustomToast} />
        <Stack.Screen name="TinderSwipe" component={TinderSwipe} />
        <Stack.Screen name="BufferVideoPlayer" component={BufferVideoPlayer} />
        <Stack.Screen name="SmartVideoPlayer" component={SmartVideoPlayer} />
        <Stack.Screen name="Masonry" component={Masonry} />
        <Stack.Screen name="GridFeed" component={GridFeed} />
        <Stack.Screen name="StickCenterCards" component={StickCenterCards} />
        <Stack.Screen
          name="StickyHeaderCardsVersionOne"
          component={StickyHeaderCardsVersionOne}
        />
        <Stack.Screen
          name="StickyHeaderCardsVersionTwo"
          component={StickyHeaderCardsVersionTwo}
        />
        <Stack.Screen name="SmartChat" component={SmartChat} />
      </Stack.Navigator>
    </View>
  );
}

export default AppStack;
