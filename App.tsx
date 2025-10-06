import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigators/AppStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {toastTypes} from './src/baseComponents/Toast';
import {ToastProvider} from 'react-native-toast-notifications';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider
        placement="top"
        duration={2000}
        animationType="slide-in"
        animationDuration={320}
        offset={50}
        offsetTop={60}
        offsetBottom={40}
        swipeEnabled={true}
        renderType={toastTypes}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
