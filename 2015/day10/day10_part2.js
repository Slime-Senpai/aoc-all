const fs = require('fs');

const inputText = fs.readFileSync('./day10_input.txt', { encoding: 'utf-8' });

let currentString = inputText;
for (let i = 0; i < 50; i++) {
	let newString = '';
	let currentDigit = currentString[0];
	let nbDigit = 1;
	for (const digit of currentString.substring(1)) {
		if (digit === currentDigit) {
			nbDigit++;
			continue;
		}

		newString += `${nbDigit}${currentDigit}`;
		currentDigit = digit;
		nbDigit = 1;
	}

	currentString = newString + `${nbDigit}${currentDigit}`;
}

console.log(currentString.length);
