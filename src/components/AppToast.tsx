import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface AppToastProps {
	message: string;
	type: string;
	onHide: () => void;
}

const AppToast: React.FC<AppToastProps> = ({ message, type, onHide }) => {
	const getToastStyle = () => {
		switch (type) {
			case 'success': return { borderColor: '#087D2F', backgroundColor: '#E7FDEF', color: '#087D2F' };
			case 'caution': return { borderColor: '#7E6901', backgroundColor: '#fff7d2', color: '#7E6901' };
			case 'warning': return { borderColor: '#BB460C', backgroundColor: '#fef5f1', color: '#BB460C' };
			case 'error': return { borderColor: '#D90226', backgroundColor: '#fff5f7', color: '#D90226' };
			default: return { borderColor: '#CAD2D8', backgroundColor: '#ffffff', color: '#000000' };
		}
	}

	return (
		<View style={[styles.toastContainer, styles.shadow, getToastStyle()]}>
			<Image style={styles.infoIcon} tintColor={getToastStyle().color} source={require('./../resource/info.png')} />
			<Text style={styles.toastText}>{message}</Text>
			{/* <View style={styles.divider}></View>
			<TouchableOpacity activeOpacity={0.8} onPress={onHide}>
				<Image style={styles.cancelIcon} source={require("./../resource/cancel.png")} />
			</TouchableOpacity> */}
		</View>
	);
};

const styles = StyleSheet.create({
	toastContainer: {
		flexDirection: 'row',
		borderWidth: 1,
		borderRadius: 12,
		alignItems: 'center',
		padding: 12,
		marginHorizontal: 16,
	},
	shadow: {
		shadowColor: '#45454529',
		shadowOffset: { width: 0, height: 24 },
		shadowOpacity: 1,
		shadowRadius: 32,
		elevation: 5
	},
	infoIcon: {
		width: 24,
		height: 24,
		marginRight: 12
	},
	toastText: {
		color: '#15191E',
		flex: 1,
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '400',
		fontFamily: 'NeueFrutigerOne-Book',
	},
	divider: {
		backgroundColor: '#CAD2D8',
		width: 1,
		marginHorizontal: 8,
		height: 32,
		paddingVertical: 8
	},
	cancelIcon: {
		width: 24,
		height: 24,
		margin: 12
	}
});

export default AppToast;
