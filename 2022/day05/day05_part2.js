const fs = require('fs');

const inputText = fs.readFileSync('./day05_input.txt', { encoding: 'utf-8' });

// HACK for nodejs, we'll define window
let window = {};

console.log(
	inputText
		.split('\n\n')
		.flatMap((e, i) => (i === 0 ? [e, e] : e))
		.map((e, i) =>
			i === 0
				? e.split('\n').forEach((f, j) =>
						j === 0
							? (window.iwanttodie = Array(Math.ceil(f.length / 4))
									.fill()
									.map((_) => []))
							: ''
				  )
				: i === 1
				? e.split('\n').forEach((f) =>
						f
							.split(/(   |\[[A-Z]\]) /)
							.filter((g) => g !== '' && g.trim()[0] !== '1')
							.forEach((g, k) => (g.trim() !== '' ? window.iwanttodie[k].push(g) : ''))
				  )
				: e.split('\n').forEach((f) =>
						f
							.split(/move (\d+) from (\d+) to (\d+)/)
							.filter((f) => f !== '')
							.map((f) => parseInt(f))
							.map((_, k, arr) => (k === 0 ? window.iwanttodie[arr[2] - 1].unshift(...window.iwanttodie[arr[1] - 1].splice(0, arr[0])) : ''))
				  )
		)
		.map((e) => window.iwanttodie)[0]
		.map((e) => e[0].trim().substring(1, e[0].length - 1))
		.reduce((a, b) => a + b, '')
);
