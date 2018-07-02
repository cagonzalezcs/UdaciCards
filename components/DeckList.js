import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Platform,
	TouchableOpacity } from 'react-native'
import { getData } from '../utils/api'
import { displayQuestionAmmount } from '../utils/helpers'
import { DeckItem } from './DeckItem'
import { orange, yellow, white } from '../utils/colors'

class DeckList extends Component {
	state = {
		decks: {}
	}
	componentDidMount() {
		getData()
			.then( data => {
				this.setState(() => ({ decks: data }))
			})
	}
	viewDeckItem( item ) {
		const { navigate } = this.props.navigation
		return navigate( 'DeckItem', { item } )
	}
	viewAddDeck() {
		const { navigate } = this.props.navigation
		return navigate( 'AddDeck' )
	}
	render() {
		const { decks } = this.state

		return (
			<View style={{flex: 1}}>
				{decks ?
				<ScrollView style={styles.container}>

						 <View>
							<Text style={styles.appTitle}>UdaciCards</Text>
							{ Object.keys(decks).map( item => {
								return (
									<View key={ decks[item].title }>
										<TouchableOpacity
											onPress = { () => this.viewDeckItem(decks[item].title) }
											style={styles.deckCard}>
											<View>
												<Text
												style={[styles.cardText, { fontSize: 20, marginBottom: 3}]}>
													{ decks[item].title }</Text>
												<Text
												style={[styles.cardText, { fontSize: 16}]}>
													{ displayQuestionAmmount( decks[item].questions.length ) }</Text>
											</View>
										</TouchableOpacity>
									</View>
								)
							})}
						</View>
				</ScrollView>
			: <View style={styles.initContainer}>
					<Text style={styles.initTitle}>Welcome to UdaciCards!</Text>
					<Text style={styles.initText}>Add Your First Deck to Begin Your Flash Card Study Session.</Text>
					<TouchableOpacity
						onPress = { () => this.viewAddDeck() }
						style = {styles.addDeckBtn}
						>
						<Text style={{color: white, textAlign: 'center', fontWeight: 'bold'}}>Add Your First Deck</Text>
					</TouchableOpacity>
				</View>
			}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 40,
		paddingLeft: 20,
		paddingRight: 20
	},
	initContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
		paddingBottom: 40,
		paddingLeft: 20,
		paddingRight: 20
	},
	initTitle: {
		color: orange,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 25,
		marginBottom: 10,
	},
	initText: {
		textAlign: 'center',
		fontSize: 16
	},
	appTitle: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: orange,
		marginTop: 20,
		marginBottom: 40,
		fontSize: 40
	},
	deckCard: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: orange,
		marginBottom: 10,
		paddingTop: 25,
		paddingBottom: 25,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 7,
		shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: {
          width: 2,
          height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1
	},
	cardText:{
		color: white,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	addDeckBtn: {
		backgroundColor: orange,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 25,
		paddingRight: 25,
		marginBottom: 10,
		marginTop: 20,
		borderRadius: 7,
		shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: {
          width: 2,
          height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1
	}
})

export default DeckList