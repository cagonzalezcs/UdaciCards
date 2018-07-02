import React, { Component } from 'react'
import {
	View,
	Text,
	KeyboardAvoidingView,
	StyleSheet,
	Platform,
	TouchableOpacity,
	TextInput } from 'react-native'
import { addNewDeck } from '../utils/api'
import { NavigationActions, StackActions } from 'react-navigation'
import NavButton from './NavButton'
import { orange, white, yellow } from '../utils/colors'

class AddDeck extends Component {
	state = {
		inputText: ''
	}
	submitNewDeck = () => {
		return addNewDeck( this.state.inputText )
			.then( this.viewDeckItem( this.state.inputText) )
	}
	viewDeckItem = (item) => {
		const { navigate, dispatch } = this.props.navigation
		const resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Home', params: { item }}),
			],
		})
		dispatch( resetAction )
		navigate( 'Deck Item', { item })
	}
	handleTextChange = (inputText) => {
		this.setState( () => ({
			inputText
		}))
	}
	render() {
		const { inputText } = this.state
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Text style={styles.label}>Please Enter the Title of Your New Deck:</Text>
				<View>
					<TextInput
						onChangeText = { this.handleTextChange }
						value = { inputText }
						placeholder = { 'Deck Title' }
						style={ styles.inputBox }
						underlineColorAndroid={ '#aaaaaa' } />
					<NavButton onPress={ this.submitNewDeck}>Create Deck</NavButton>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	label: {
		fontSize: 18,
		marginLeft: 20,
		marginRight: 20,
		textAlign: 'center'
	},
	inputBox: {
		height: 40,
		width: 350,
		fontSize: 18,
		backgroundColor: Platform.OS === 'ios' ? '#eee' : 'transparent',
		borderColor: orange,
		shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        padding: 5,
        marginBottom: 20,
        marginTop: 10,
	}
})

export default AddDeck