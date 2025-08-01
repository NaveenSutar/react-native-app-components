import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TextInput, Button} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import SeeMoreText from './SeeMoreText';

const {width} = Dimensions.get('window');

const QRScreen = () => {
  const [myText, setMyText] = useState('');
  const [qrValue, setQrValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setMyText(text)}
        value={myText}
        placeholder="Enter text to generate QR code"
        autoCapitalize="none"
      />
      <Button title="Generate QR" onPress={() => setQrValue(myText)} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: width - 32,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});

export default QRScreen;
