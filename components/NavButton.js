import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { orange, yellow, white } from '../utils/colors'

function NavButton({ children, onPress, style = {} }) {
	return (
		<TouchableOpacity style={ [styles.btn, style] } onPress={ onPress }>
			<Text style={ [styles.btnText, style] }>{ children }</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	btn: {
		backgroundColor: orange,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 7,
		shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: {
          width: 2,
          height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1
	},
	btnText: {
		textAlign: 'center',
		color: white,
		fontWeight: '700'
	}
})

export default NavButton