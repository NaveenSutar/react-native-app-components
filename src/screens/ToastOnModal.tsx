import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

const ToastOnModal = () => {
  const toast = useToast();
  //   const [open, setOpen] = useState(false);

  const showToast = (type: string) => {
    toast.hideAll();
    toast.show('Test Toast on Modal', {
      type: type,
      duration: 2000,
      animationType: 'slide-in',
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Open Modal" onPress={() => showToast('error')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ToastOnModal;
