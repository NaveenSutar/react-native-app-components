//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// create a component
const RememberMe = () => {
    const [check, setCheck] = React.useState(false);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setCheck(!check)} style={[styles.tickContainer, {
                    borderColor: check ? "#0072DB" : "#6B8094",
                    backgroundColor: check ? '#0072DB' : 'transparent'
                }]}>
                    {check && <Image source={require('./../resource/tick.png')} />}
                </TouchableOpacity>
                <Text style={styles.checkText}>Remember me</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    tickContainer: {
        height: 24,
        width: 24,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
    },
    checkText: {
        fontSize: 16,
        lineHeight: 24,
    }
});

//make this component available to the app
export default RememberMe;
