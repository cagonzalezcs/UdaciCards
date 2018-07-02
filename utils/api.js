import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'UdaciCards:deck'

function deckResults(results) {
	return results !== null
		? JSON.parse(results)
		: null
}
export function getDeckItem(item) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(deckResults)
		.then( ( results ) => results[item])
}

export function getData() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY).then(deckResults)
}
export function addNewDeck(title, key) {
	return AsyncStorage.mergeItem(
		DECK_STORAGE_KEY,
		JSON.stringify({
			[title]: {
				title,
				questions: []
			},
		}),
	)
}
export function addNewCard(title, content) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(data => {
			deck = JSON.parse(data)
			deck[title].questions.push(content)
			AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck))
		})
}