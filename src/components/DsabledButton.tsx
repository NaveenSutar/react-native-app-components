import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../baseComponents/Header';

const DisabledButton = () => {
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

  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
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
            isDisabled
              ? styles.disabledButtonContainer
              : styles.buttonContainer,
          ]}
          disabled={isDisabled}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Disabled Button" isBackVisible />
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
  input: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderColor: '#00000050',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    backgroundColor: '#212121',
    borderRadius: 8,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  disabledButtonContainer: {
    backgroundColor: '#21212190',
    paddingVertical: 16,
    borderRadius: 8,
  },
});

export default DisabledButton;
