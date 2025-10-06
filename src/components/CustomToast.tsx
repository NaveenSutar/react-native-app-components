import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Header from '../baseComponents/Header';
import {useToast} from 'react-native-toast-notifications';

const CustomToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (type: string) => {
      requestAnimationFrame(() => {
        toast.show(
          'No internet connection, please check connection and try again.',
          {
            type: type,
            duration: 2000,
            animationType: 'slide-in',
          },
        );
      });
    },
    [toast],
  );

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => showToast('default')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Default Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showToast('success')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Success Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showToast('caution')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Caution Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showToast('warning')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Warning Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showToast('error')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Error Toast</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Blank Component" isBackVisible />
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
  },
  buttonContainer: {
    backgroundColor: '#212121',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomToast;
