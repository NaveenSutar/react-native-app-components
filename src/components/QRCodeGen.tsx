import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Header from '../baseComponents/Header';

const {width} = Dimensions.get('window');

const QRCodeGen = () => {
  const [myText, setMyText] = useState('');
  const [qrValue, setQrValue] = useState('');

  const renderComponent = () => {
    return (
      <>
        <TextInput
          style={styles.input}
          onChangeText={text => setMyText(text)}
          value={myText}
          placeholder="Enter text to generate QR code"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setQrValue(myText)}>
          <Text style={styles.buttonText}>Generate QR</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <QRCode
            onError={(error: any) => console.log(error)}
            quietZone={8}
            size={width - 64}
            value={qrValue}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="QR Code Generator" isBackVisible />
      {renderComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: width - 32,
    borderWidth: 1,
    margin: 16,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  button: {
    width: width - 32,
    backgroundColor: '#212121',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRCodeGen;
