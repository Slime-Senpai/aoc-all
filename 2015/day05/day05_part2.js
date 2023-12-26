const fs = require('fs');

const inputText = fs.readFileSync('./day05_input.txt', { encoding: 'utf-8' });

const words = inputText.split('\n');

let nbNice = 0;
for (const word of words) {
	let hasNicerDoubleLetter = false;
	let hasRepeatingPattern = false;
	let lastLetter = '';
	let evenMoreLastLetter = '';

	let startOfSearch = 1;
	for (const letter of word) {
		if (lastLetter != '' && word.includes(`${lastLetter}${letter}`, startOfSearch)) {
			hasRepeatingPattern = true;
		}

		if (evenMoreLastLetter === letter) {
			hasNicerDoubleLetter = true;
		}

		evenMoreLastLetter = lastLetter;
		lastLetter = letter;
		startOfSearch++;
	}

	if (hasRepeatingPattern && hasNicerDoubleLetter) {
		nbNice++;
	}
}

console.log(nbNice);
