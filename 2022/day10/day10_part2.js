const fs = require('fs');

const inputText = fs.readFileSync('./day10_input.txt', { encoding: 'utf-8' });

// HACK for nodejs, we'll define window
let window = {};

console.log(
	inputText
		.split('\n')
		.flatMap((e, i) => (i === 0 ? [e, e] : e))
		.map((e) => e.split(' '))
		.map((e, i) =>
			i === 0
				? (window.obj = { x: 1, c: 0, strength: 0, render: '' })
				: e[0] === 'addx'
				? Array(2)
						.fill()
						.forEach(
							() =>
								(window.obj.render += window.obj.x - 1 <= window.obj.c % 40 && window.obj.x + 1 >= window.obj.c % 40 ? '#' : '.') &&
								++window.obj.c
						) || (window.obj.x += parseInt(e[1]))
				: (window.obj.render += window.obj.x - 1 <= window.obj.c % 40 && window.obj.x + 1 >= window.obj.c % 40 ? '#' : '.') && ++window.obj.c
		)
		.reduce((_) => window.obj.render)
		.split('')
		.reduce((a, b, i) => a + (i % 40 === 0 ? '\n' : '') + b)
);
