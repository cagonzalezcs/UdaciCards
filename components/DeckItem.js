import React, { Component } from 'react'
import  { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { NavigationActions } from 'react-navigation'
import NavButton from './NavButton'
import { getDeckItem } from '../utils/api'
import { displayQuestionAmmount } from '../utils/helpers'
import { orange, yellow, red, white } from '../utils/colors'


class DeckItem extends Component {
	state = {
		deck: { questions:[] },
		opacity: new Animated.Value(0)
	}
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.item
	})
	componentDidMount() {
		const { opacity } = this.state
		getDeckItem( this.props.navigation.state.params.item )
			.then( (results) => this.setState( () => ({ deck: results })))
			.then(() =>
				Animated.timing(opacity, { toValue: 1, duration: 700 }).start()
			)
	}
	startQuiz = ( item ) => {
		const { navigate } = this.props.navigation
		return navigate( "DeckQuiz", { item })
	}
	handleNavigation = ( content ) => {
		const newDeck = this.state.deck
		newDeck.questions.push( content )
		this.setState( () => ({ deck: newDeck }));
	}
	addNewCard = ( item ) => {
		const { navigate } = this.props.navigation
		return navigate('AddNewCard', {
			item,
			navBack: this.handleNavigation
		})
	}

	render() {
		const { deck, opacity } = this.state

		return (
			<Animated.View style={[styles.container, { opacity }]}>
				<Text style={styles.deckTitle}>{deck.title}</Text>
				<Text style={styles.questionsText}>
					This Deck Contains {displayQuestionAmmount(deck.questions.length)}
				</Text>
				<NavButton
					style={styles.addBtn}
					onPress={ () => this.addNewCard(deck.title) }
					>
					Add Card
				</NavButton>
				{deck.questions.length > 0
					? (
						<NavButton
							style={styles.quizBtn}
							onPress={ () => this.startQuiz(deck.title) }
							>
							Start Quiz
						</NavButton>
					) : (
						<Text style={styles.mainContent}>
							{deck.title} does not have any cards yet. To start a quiz, please add one or more cards.
						</Text>
				)}

			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	deckTitle: {
		color: orange,
		marginBottom: 2,
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 40,
		textAlign: 'center'
	},
	questionsText: {
		marginBottom: 40,
		fontSize: 20,
	},
	addBtn: {
		backgroundColor: yellow,
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 10,
		marginTop: 10
	},
	quizBtn: {
		backgroundColor: orange,
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 10,
		marginTop: 10

	},
	mainContent: {
		textAlign:'center',
		marginLeft: 20,
		marginRight: 20
	}
})

export default DeckItem