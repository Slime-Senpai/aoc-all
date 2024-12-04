const fs = require('fs');

const inputText = fs.readFileSync('./day01_input.txt', { encoding: 'utf-8' });

console.log(
	inputText
		.split('\n\n')
		.map((e) => e.split('\n').reduce((a, b) => +a + +b, 0))
		.sort((a, b) => b - a)
		.splice(0, 3)
		.reduce((a, b) => a + b, 0)
);
