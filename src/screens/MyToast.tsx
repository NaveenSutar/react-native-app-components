import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

const MyToast = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const showToast = (type: string) => {
    toast.hideAll();
    toast.show(
      'No internet connection, please check connection and try again.',
      {
        type: type,
        // duration: 2000,
        // animationType: "slide-in",
      },
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Default Toast" onPress={() => showToast('default')} />
      <Button title="Success Toast" onPress={() => showToast('success')} />
      <Button title="Caution Toast" onPress={() => showToast('caution')} />
      <Button title="Warning Toast" onPress={() => showToast('warning')} />
      <Button title="Error Toast" onPress={() => showToast('error')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default MyToast;
