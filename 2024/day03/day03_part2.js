const fs = require('fs');

const inputText = fs.readFileSync('./day03_input.txt', { encoding: 'utf-8' });

const mulRegex = /mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/g;

const matches = inputText.matchAll(mulRegex);


let total = 0;

let enabled = true;
for (const match of matches) {
	if (match[0] === 'do()') {
		enabled = true;
		continue;
	} else if (match[0] === 'don\'t()') {
		enabled = false;
		continue;
	}

	if (!enabled) {
		continue;
	}

	const firstDigit = +match[1];
	const secondDigit = +match[2];

	total += firstDigit * secondDigit;
}

console.log(total);
