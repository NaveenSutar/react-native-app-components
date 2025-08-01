import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ButtonScreen = () => {
  const [username, setUsername] = useState('');
  const [phNo, setPhNo] = useState('');
  const [address, setAddress] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = () => {
    console.log('Username:', username);
    console.log('Ph. No.:', phNo);
    console.log('Address:', address);
  };

  const validateForm = () => {
    if (username.trim() === '' || phNo.trim() === '' || address.trim() === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'phNo':
        setPhNo(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        break;
    }
    validateForm();
  };

  useEffect(() => {
    validateForm();
  }, [username, phNo, address]);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={val => handleInputChange('username', val)}
        value={username}
        style={styles.input}
        placeholder="Username"
      />
      <TextInput
        onChangeText={val => handleInputChange('phNo', val)}
        value={phNo}
        style={styles.input}
        placeholder="Ph. No."
      />
      <TextInput
        onChangeText={val => handleInputChange('address', val)}
        value={address}
        style={styles.input}
        placeholder="Address"
      />
      <TouchableOpacity
        onPress={() => !isDisabled && handleSubmit()}
        style={[
          isDisabled ? styles.disabledButtonContainer : styles.buttonContainer,
        ]}
        disabled={isDisabled}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    padding: 8,
    margin: 8,
    borderColor: '#00000050',
    borderWidth: 1,
    width: '80%',
    borderRadius: 8,
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 8,
    width: '80%',
    margin: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  disabledButtonContainer: {
    backgroundColor: '#7f8c8d',
    paddingVertical: 8,
    width: '80%',
    margin: 8,
    borderRadius: 8,
  },
});

export default ButtonScreen;
