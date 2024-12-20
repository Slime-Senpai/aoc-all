const fs = require('fs');

const inputText = fs.readFileSync('./day03_input.txt', { encoding: 'utf-8' });

const mulRegex = /mul\((\d+),(\d+)\)/g;

const matches = inputText.matchAll(mulRegex);


let total = 0;
for (const match of matches) {
	const firstDigit = +match[1];
	const secondDigit = +match[2];

	total += firstDigit * secondDigit;
}

console.log(total);
