import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface HeaderProps {
  title: string;
  isBackVisible?: boolean;
}

const Header = (props: HeaderProps) => {
  const {title, isBackVisible = false} = props;

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {isBackVisible && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            source={require('../assets/icons/back.png')}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {isBackVisible && <Image style={styles.backIcon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  backIcon: {
    height: 16,
    width: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#121212',
    textAlign: 'center',
    flex: 1,
  },
});

export default Header;
