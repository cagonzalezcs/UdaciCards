// Helper Functions

export function displayQuestionAmmount(questions) {
	const numQuestions = questions;

	if (numQuestions === 1) {
		return `${numQuestions} Card`
	}

	return `${numQuestions} Cards`
}