import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../baseComponents/Header';

const Blank = () => {
  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <Text>Component</Text>
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
    alignItems: 'center',
  },
});

export default Blank;
