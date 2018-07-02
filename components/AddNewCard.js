import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TextInput,
	KeyboardAvoidingView } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { addNewCard } from '../utils/api'
import NavButton from './NavButton'
import { orange, yellow, white } from '../utils/colors'

class AddNewCard extends Component  {
	state = {
		question: '',
		answer: '',
		title: '',
	}
	componentDidMount() {
		this.setState( () => ({
			title: this.props.navigation.state.params.item
		}))
	}
	submitNewCard = ( title ) => {
		newQuestion = this.state.question
		newAnswer = this.state.answer

		const content = {
			question: newQuestion,
			answer: newAnswer
		}

		if(!newQuestion || !newAnswer) {
			return alert('Please Fill Out Both the Question and Answer')
		}

		return addNewCard( title, content )
			.then( () => this.viewDeckItem( this.state.title, content ))
	}
	viewDeckItem = ( item, content ) => {
		const { navigate, dispatch } = this.props.navigation
		const resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Home', params: { item }}),
			]
		})
		dispatch(resetAction)
		navigate('DeckItem', { item })
	}
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View>
					<Text style={styles.heading}>Deck: {this.props.navigation.state.params.item}</Text>
					<Text style={styles.label}>Enter Your Question: </Text>
					<TextInput
						style={ styles.inputBox }
						onChangeText={ ( question ) => this.setState({ question }) }
						value={ this.state.question }
						placeholder={'Your Question'}/>
				</View>
				<View>
					<Text style={styles.label}>Enter The Answer:</Text>
					<TextInput
						style={ styles.inputBox }
						onChangeText={ ( answer ) => this.setState({ answer }) }
						value={ this.state.answer }
						placeholder={'Your Answer'}/>
				</View>
				<NavButton
					onPress={() => this.submitNewCard(this.props.navigation.state.params.item)}
				>
					Submt New Card
				</NavButton>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	heading: {
		color: orange,
		fontWeight: 'bold',
		marginTop: 40,
		marginBottom: 20,
		fontSize: 30
	},
	label: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	inputBox: {
		height: 40,
		width: 350,
		fontSize: 16,
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

export default AddNewCard