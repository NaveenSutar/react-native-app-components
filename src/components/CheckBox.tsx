import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Header from '../baseComponents/Header';

const CheckBox = () => {
  const [check, setCheck] = React.useState(false);

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setCheck(!check)}
            style={[
              styles.tickContainer,
              {
                borderColor: check ? '#212121' : '#6B8094',
                backgroundColor: check ? '#212121' : 'transparent',
              },
            ]}>
            {check && <Image source={require('./../assets/icons/tick.png')} />}
          </TouchableOpacity>
          <Text style={styles.checkText}>Remember me</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Check box" isBackVisible />
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
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickContainer: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CheckBox;
