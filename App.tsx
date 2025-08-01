import React from 'react';
import MyToast from './src/screens/MyToast';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Toast, ToastProvider} from 'react-native-toast-notifications';
import AppToast from './src/components/AppToast';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import RememberMe from './src/screens/RememberMe';
import ButtonScreen from './src/screens/ButtonScreen';
import FeedGrid from './src/screens/FeedGrid';
import FeedGridSqNRect from './src/screens/FeedGridSqNRect';
import Masonry from './src/screens/Masonry';
import ToastOnModal from './src/screens/ToastOnModal';
import UserLocation from './src/screens/UserLocation';
import TinderSwipe from './src/screens/TinderSwipe';
import QRScreen from './src/screens/QRScreen';
import SeeMoreText from './src/screens/SeeMoreText';
import SlideAnim from './src/screens/SlideAnim';
import VideoPlayer from './src/screens/VideoPlayer';

interface Toast {
  id: string;
  message: string;
  open: boolean;
  placement: string;
  duration: number;
  animationType: string;
  animationDuration: number;
  offset: number;
  offsetTop: number;
  offsetBottom: number;
  swipeEnabled: boolean;
  renderType: ToastType;
  type: string;
  onHide: () => void;
  onDestroy: () => void;
}

interface ToastType {
  default: () => void;
  success: () => void;
  caution: () => void;
  warning: () => void;
  error: () => void;
}

const App = () => {
  const toastTypes: {[key: ToastType]: (toast: Toast) => JSX.Element} = {
    default: (toast: Toast) => (
      <AppToast
        message={toast.message}
        type={'default'}
        onHide={() => toast.onHide()}
      />
    ),
    // success: (toast: Toast) => (
    //   <AppToast
    //     message={toast.message}
    //     type={'success'}
    //     onHide={() => toast.onHide()}
    //   />
    // ),
    caution: (toast: Toast) => (
      <AppToast
        message={toast.message}
        type={'caution'}
        onHide={() => toast.onHide()}
      />
    ),
    warning: (toast: Toast) => (
      <AppToast
        message={toast.message}
        type={'warning'}
        onHide={() => toast.onHide()}
      />
    ),
    error: (toast: Toast) => (
      <AppToast
        message={toast.message}
        type={'error'}
        onHide={() => toast.onHide()}
      />
    ),
  };

  const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screenOptions: {
      headerShown: true,
    },
    screens: {
      Home: {
        screen: Home,
      },
      MyToast: {
        screen: MyToast,
        options: {
          title: 'Toast',
        },
      },
      RememberMe: {
        screen: RememberMe,
        options: {
          title: 'Remember Me',
        },
      },
      ButtonScreen: {
        screen: ButtonScreen,
        options: {
          title: 'Hidden Button',
        },
      },
      Feed: {
        screen: FeedGrid,
        options: {
          title: 'Feed Grid',
        },
      },
      FeedGridSqNRect: {
        screen: FeedGridSqNRect,
        options: {
          title: 'Feed Grid Square and Rectangle',
        },
      },
      Masonry: {
        screen: Masonry,
        options: {
          title: 'Masonry List',
        },
      },
      ToastOnModal: {
        screen: ToastOnModal,
        options: {
          title: 'Toast On Modal',
        },
      },
      UserLocation: {
        screen: UserLocation,
        options: {
          title: 'User Location',
        },
      },
      TinderSwipe: {
        screen: TinderSwipe,
        options: {
          title: 'Tinder Swipe',
        },
      },
      QRCode: {
        screen: QRScreen,
        options: {
          title: 'QR Code',
        },
      },
      SeeMore: {
        screen: SeeMoreText,
        options: {
          title: 'See More',
        },
      },
      SlideAnim: {
        screen: SlideAnim,
        options: {
          title: 'Slide Animation',
        },
      },
      VideoPlayer: {
        screen: VideoPlayer,
        options: {
          title: 'Video Player',
        },
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return (
    <ToastProvider
      placement="top"
      duration={3000}
      animationType="slide-in"
      animationDuration={320}
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
      renderType={toastTypes}>
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
