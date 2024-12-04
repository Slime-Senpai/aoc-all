const fs = require('fs');

const inputText = fs.readFileSync('./day06_input.txt', { encoding: 'utf-8' });

console.log(
	inputText.split('').findIndex(
		(a, i, arr) =>
			i > 12 &&
			!arr
				.slice(i - 13, i)
				.map((b, j, array) => [...array.slice(0, j), ...array.slice(j + 1)].includes(b))
				.reduce((t, s) => t || s, false) &&
			!arr.slice(i - 13, i).includes(a)
	) + 1
);
