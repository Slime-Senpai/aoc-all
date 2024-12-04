const fs = require('fs');

const inputText = fs.readFileSync('./day02_input.txt', { encoding: 'utf-8' });

console.log(
	inputText
		.split('\n')
		.map((e) => {
			return { 'A X': 4, 'A Y': 8, 'A Z': 3, 'B X': 1, 'B Y': 5, 'B Z': 9, 'C X': 7, 'C Y': 2, 'C Z': 6, '': 0 }[e];
		})
		.reduce((a, b) => a + b, 0)
);
