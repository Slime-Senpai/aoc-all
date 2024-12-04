const fs = require('fs');

const inputText = fs.readFileSync('./day03_input.txt', { encoding: 'utf-8' });

console.log(
	inputText
		.split(/([a-zA-Z]+\n[a-zA-Z]+\n[a-zA-Z]+)\n/)
		.filter((a) => a !== '')
		.map((e) =>
			e
				.split('\n')[0]
				.split('')
				.map((f) =>
					e.split('\n')[1].includes(f) && e.split('\n')[2].includes(f)
						? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(f) + 1
						: 0
				)
				.find((a) => a !== 0)
		)
		.reduce((a, b) => a + b, 0)
);
