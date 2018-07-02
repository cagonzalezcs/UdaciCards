import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Animated
} from 'react-native'
import NavButton from './NavButton'
import { getDeckItem } from '../utils/api'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'
import { orange, white, yellow, green, red } from '../utils/colors'

class DeckQuiz extends Component  {
	state = {
		deck: {
			questions: [
				{
					question: '',
					answer: '',
				},
			],
		},
		viewAnswer: false,
		currentCardNum: 0,
		counter: 0,
		quizFinished: false,
		opacity: new Animated.Value(0)
	}
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.item
	})
	componentDidMount() {
		const { opacity } = this.state;

		getDeckItem(this.props.navigation.state.params.item)
			.then(results => this.setState(() => ({ deck: results })))
			.then(() =>
				Animated.timing(opacity, { toValue: 1, duration: 700 }).start()
			)
	}
	nextCard = (currentCardNum, deck) => {
		currentCardNum++;

		if(currentCardNum < deck.questions.length) {
			this.setState(() => ({ currentCardNum: currentCardNum }))
		} else {
			this.setState(() => ({ quizFinished: true }))
			clearLocalNotification()
				.then(setLocalNotification)
		}
	}
	flipCard = (viewAnswer) => {
		this.setState(() => ({ viewAnswer: !viewAnswer }))
	}
	viewHome = () => {
		const { navigate } = this.props.navigation
		return navigate('Home')
	}
	restartQuiz = () => {
		this.setState(() => ({
			quizFinished: false,
			counter:0,
			currentCardNum: 0
		}))
	}
	correctAnswer = (currentCardNum, deck) => {
		this.setState(() => ({ counter: this.state.counter + 1}))
		this.nextCard(currentCardNum, deck)
	}
	render() {
		const {
			deck,
			viewAnswer,
			currentCardNum,
			quizFinished,
			counter,
			opacity
		} = this.state

		return quizFinished ? (
			<Animated.View style={[styles.container, { opacity }]}>
				<Text style={styles.scoreTitle}>Your Score</Text>
				<Text style={styles.scoreNum}>
					{`${
						parseFloat(
							(counter / deck.questions.length * 100).toFixed(2),
						)}%`}
				</Text>
				<Text style={styles.scoreSubtitle}>Answered Correctly</Text>
				<Text style={styles.scoreMessage}>
					{counter / deck.questions.length * 100 >= 75
						? "Great Job! You've Remember Most of the Answers"
						: "Keep Working at It! Practice Makes Perfect"
					}
				</Text>
				<NavButton
					style={styles.homeBtn}
					onPress={() => this.viewHome()}
					>
					View My Decks
				</NavButton>
				<NavButton
					style={styles.restartBtn}
					onPress={() => this.restartQuiz()}
					>
					Restart Quiz
				</NavButton>
			</Animated.View>
		) : (
			<ScrollView>
				<Animated.View style={{ opacity }}>
					<View style={styles.headerContainer}>
						<Text style={styles.quizCounter}>{`${currentCardNum + 1} of ${deck.questions.length}`}</Text>
						<Text style={styles.quizHeader}>Quiz</Text>
					</View>
					<View style={styles.questionBox}>
						<Text style={styles.questionContent}>
							{viewAnswer
							? deck.questions[currentCardNum].answer
							: deck.questions[currentCardNum].question}
						</Text>
					</View>
					<TouchableOpacity onPress={() => this.flipCard(viewAnswer)}>
						<Text style={styles.answerBtnText}>{viewAnswer ? "Show Question" : "Show Answer"}</Text>
					</TouchableOpacity>
					<View style={styles.userOptions}>
						<NavButton
							style={styles.correctBtn}
							onPress={() => this.correctAnswer(currentCardNum, deck)}>
							Correct
						</NavButton>
						<NavButton
							style={styles.incorrectBtn}
							onPress={() => this.nextCard(currentCardNum, deck)}>
							Incorrect
						</NavButton>
					</View>
				</Animated.View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop:40,
		paddingBottom: 60,
		paddingLeft: 10,
		paddingRight: 10
	},
	scoreTitle: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: orange,
		fontSize: 30
	},
	scoreNum: {
		color: orange,
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 5,
		fontSize: 50
	},
	scoreSubtitle: {
		color: orange,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 20
	},
	scoreMessage: {
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 20,
		textAlign: 'center'
	},
	homeBtn: {
		backgroundColor: yellow,
		marginBottom: 10,
		marginTop: 10,
		paddingLeft: 25,
		paddingRight: 25
	},
	restartBtn: {
		marginBottom: 10,
		marginTop: 10,
		paddingLeft: 25,
		paddingRight: 25
	},
	headerContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 7,
		paddingRight: 10,
		paddingLeft: 10
	},
	quizHeader: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#888'
	},
	quizCounter: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#444'
	},
	questionBox: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 60,
		paddingBottom: 40,
		paddingRight: 15,
		paddingLeft: 15
	},
	questionContent: {
		textAlign: 'center',
		fontSize: 32,
	},
	answerBtnText: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		color: orange
	},
	userOptions: {
		padding: 10,
		marginTop: 40
	},
	correctBtn:{
		backgroundColor: green,
		marginBottom: 10,
		marginTop: 10,
		paddingLeft: 25,
		paddingRight: 25
	},
	incorrectBtn: {
		backgroundColor: red,
		marginBottom: 10,
		marginTop: 10,
		paddingLeft: 25,
		paddingRight: 25
	}
})

export default DeckQuiz