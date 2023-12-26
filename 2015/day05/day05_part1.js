const fs = require('fs');

const inputText = fs.readFileSync('./day05_input.txt', { encoding: 'utf-8' });

const words = inputText.split('\n');

const vowels = 'aeiou';

const badStrings = ['ab', 'cd', 'pq', 'xy'];

let nbNice = 0;
for (const word of words) {
	let nbVowels = 0;
	let hasDoubleLetter = false;
	let lastLetter = '';
	let isBad = false;

	for (const letter of word) {
		if (vowels.includes(letter)) {
			nbVowels++;
		}
		if (lastLetter === letter) {
			hasDoubleLetter = true;
		}
		if (badStrings.includes(`${lastLetter}${letter}`)) {
			isBad = true;
			break;
		}

		lastLetter = letter;
	}

	if (!isBad && nbVowels > 2 && hasDoubleLetter) {
		nbNice++;
	}
}

console.log(nbNice);
