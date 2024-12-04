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
				? (window.obj = { x: 1, c: 0, check: 20, strength: 0 })
				: e[0] === 'addx'
				? Array(2)
						.fill()
						.forEach(() =>
							++window.obj.c === window.obj.check
								? Array(2)
										.fill()
										.forEach((_, i) => (i === 0 ? (window.obj.strength += window.obj.x * window.obj.c) : (window.obj.check += 40)))
								: ''
						) || (window.obj.x += parseInt(e[1]))
				: ++window.obj.c === window.obj.check
				? Array(2)
						.fill()
						.forEach((_, i) => (i === 0 ? (window.obj.strength += window.obj.x * window.obj.c) : (window.obj.check += 40)))
				: ''
		)[0].strength
);
