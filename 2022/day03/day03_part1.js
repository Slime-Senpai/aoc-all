const fs = require('fs');

const inputText = fs.readFileSync('./day03_input.txt', { encoding: 'utf-8' });

console.log(
	inputText
		.split('\n')
		.map((e) =>
			e
				.slice(0, e.length / 2)
				.split('')
				.map((f) => (e.slice(e.length / 2).includes(f) ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(f) + 1 : 0))
				.find((a) => a !== 0)
		)
		.reduce((a, b) => a + b, 0)
);
